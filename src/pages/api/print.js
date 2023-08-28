import fs from 'node:fs/promises';
import { exec } from "node:child_process";
import { Buffer } from 'node:buffer';
import sharp from 'sharp';
import convertImageToBitmap from '@/helpers/convertImageToBitmap';
import ensureDivisible from '@/helpers/ensureDivisible';

/**
 * Compile Arduino sketch at arduino/sketches/print and upload it to specified board. 
 */
const compileAndUpload = ({ buildProperty, onSuccess, onFailure }) => {
  const command = `arduino-cli compile ${buildProperty ? "--build-property compiler.cpp.extra_flags=-D" + buildProperty : ""} -b arduino:avr:uno arduino/sketches/print --output-dir arduino/sketches/print --upload --port /dev/cu.usbmodem1401`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      onFailure();
      return;
    }

    if (stderr) {
      console.log(`stderr: ${stderr}`);
      onFailure();
      return;
    }

    console.log(`stdout: ${stdout}`);
    onSuccess();
  });
}

/**
 * Upon receiving image from client:
 *  - Load image from base64
 *  - If image is in landscape orientation, rotate 90 degrees
 *  - Trim off whitespace
 *  - Calculate new image dimensions per max bitmap width supported by thermal printer (384 pixels)
 *  - Recursively print image in quarters (printing the full image at once will often exceed
 *    the Arduino Uno's max sketch size of 32256 bytes)
 *     - Resize image portion according to calculated dimensions
 *     - Create 8-bit binary pixel buffer from image portion's alpha channel
 *     - Convert pixel buffer to hexadecimal bitmap with C++ headers
 *     - Write C++ pixel buffer to 'image.h' file in same directory as Arduino print sketch
 *     - Upload print sketch to Arduino board
 *     - After a delay, continue to next image portion
 *  - Notify client of success/failure
 */
export default async function handler(req, res) {
  // Load image from base64
  var base64Url = req.body.data;
  var base64Str = base64Url.split(',')[1];
  var base64Buffer = Buffer.from(base64Str, 'base64');

  // If image is in landscape orientation, rotate 90 degrees
  // Trim off whitespace
  var { data, info } = await sharp(base64Buffer)
    .rotate(90)
    .trim()
    .png()
    .toBuffer({ resolveWithObject: true });

  // Calculate new image dimensions per max bitmap width supported by thermal printer (384 pixels)
  var chunkDenominator = 4;
  var width = 384;
  var height = ensureDivisible(width * (info.height / info.width), chunkDenominator);

  console.log("Will print image in chunks...");
  console.log("> full width", width);
  console.log("> full height", height);

  // Print image in portions
  printImagePortion(data, chunkDenominator);

  /**
   *  Recursively print image in quarters (printing the full image at once will often exceed
   *  the Arduino Uno's max sketch size of 32256 bytes)
   * 
   *  TODO: Add dynamic sketch size detection and only take the recursive approach if necessary.
   * 
   *  @param {*} data -- image buffer data
   *  @param {*} chunkHeightDenominator -- denominator for image portion calculation (a value of 4 will print image in quarters)
   *  @param {*} i -- index for recursion logic
   */
  async function printImagePortion(data, chunkHeightDenominator, i) {
    if (!i) i = 0;

    console.log("\n--- Printing image portion with index", i, "---");

    // Calculate extraction region for this pass
    var chunkHeight = height / chunkHeightDenominator;
    var chunkTop = (0 === i) ? 0 : i * chunkHeight;
    var extractRegion = {
      left: 0,
      top: chunkTop,
      width: width,
      height: chunkHeight
    }

    // define logic control vars
    var isFirstPass = 0 === i;
    var isLastPass = chunkTop + chunkHeight === height;

    console.log("> isFirstPass", isFirstPass);
    console.log("> isLastPass", isLastPass);
    console.log("> extractRegion", extractRegion);

    // Resize image portion according to calculated dimensions
    // Create 8-bit binary pixel buffer from image portion's alpha channel
    var buffer = await sharp(data)
      .negate()
      .ensureAlpha()
      .threshold()
      .extractChannel(3)
      .resize({ width, height, fit: "contain" })
      .extract(extractRegion)
      .raw()
      .toBuffer();

    console.log("> buffer", buffer);

    // Convert pixel buffer to hexadecimal bitmap with C++ headers
    const bitmap = convertImageToBitmap({
      width: width,
      height: chunkHeight,
      buffer: buffer
    });

    // Upon successful print, continue to next pass or, if last pass, notify client of success
    const onPrintSuccess = async () => {
      if (isLastPass) {
        res.status(200).json({ status: "success" });
      } else {
        var delay = 15; // sec
        console.log("> Uploaded sketch to Arduino. Continuing in " + delay + " seconds.");
        setTimeout(async () => await printImagePortion(data, chunkHeightDenominator, i + 1), delay * 1000);
      }
    }

    // Upon failed print, notify client of failure
    const onPrintFailure = () => {
      res.status(200).json({ status: "failure" });
    }

    // Write C++ pixel buffer to 'image.h' file in same directory as Arduino print sketch
    // Upload print sketch to Arduino board
    await fs.writeFile('arduino/sketches/print/image.h', bitmap)
      .then(() => compileAndUpload({
        buildProperty: (isFirstPass) ? "PAD_START" : (isLastPass) ? "PAD_END" : null,
        onSuccess: onPrintSuccess,
        onFailure: onPrintFailure
      }))
      .catch(err => console.error(err));
  }
}