import fs from 'node:fs/promises';
import { exec } from "node:child_process";
import { Buffer } from 'node:buffer';
import sharp from 'sharp';
import convertImageToBitmap from '@/helpers/convertImageToBitmap';
import ensureDivisible from '@/helpers/ensureDivisible';

// compile arduino sketch
const compileAndUpload = ({ buildProperty, onSuccess, onFailure }) => {
  const command = `arduino-cli compile ${buildProperty ? "--build-property compiler.cpp.extra_flags=-D" + buildProperty : ""} -b arduino:avr:uno arduino/sketches/print --output-dir arduino/sketches/print --upload --port /dev/cu.usbmodem11401`;

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
 *  1. Transform image (remove edge whitespace, invert, extract alpha channel,
 *     convert to b-w colorspace and resize to max printer width of 384px)
 *  2. Convert image to 1-deep hexadecimal bitmap, add C header/footer to integrate
 *     width Arduino sketch, write to .h file
 *  3. Compile Arduino sketch and upload to board
 *  4. Respond to client with success/failure message
 * @param {*} req -- req.body.data contains an image in base64 url format
 * @param {*} res
 */
export default async function handler(req, res) {
  // convert base64 url to base64 buffer
  var base64Url = req.body.data;
  var base64Str = base64Url.split(',')[1];
  var base64Buffer = Buffer.from(base64Str, 'base64');

  // load image and trim off whitespace
  var { data, info } = await sharp(base64Buffer)
    .rotate(90)
    .trim()
    .png()
    .toBuffer({ resolveWithObject: true });

  // calculate new image dimensions according to max bitmap width supported by printer (384 pixels)
  // note that the maximum width of bitmaps supported by printer is 384px
  // var width = 384;
  var chunkDenominator = 4;
  var width = 384;
  var height = ensureDivisible(width * (info.height / info.width), chunkDenominator);

  console.log("Will print image in chunks...");
  console.log("> full width", width);
  console.log("> full height", height);

  // print image in chunks
  printImagePortion(data, chunkDenominator);

  /**
   * Print image recursively. This is necessary because it is common to exceed the maximum sketch
   * size supported by our Arduino board.
   * 
   * TODO: Add dynamic sketch size detection and only take the recursive approach if necessary.
   * 
   * @param {*} data 
   * @param {*} heightFactor 
   * @param {*} i 
   */
  async function printImagePortion(data, chunkHeightDenominator, i) {
    if (!i) i = 0;

    console.log("\n--- Printing image portion with index", i, "---");

    // calculate extraction region for this pass
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

    console.log("> isFirstPass", isFirstPass)
    console.log("> isLastPass", isLastPass)
    console.log("> extractRegion", extractRegion)

    // extract portion of image for this pass
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

    // convert buffer to bitmap
    const bitmap = convertImageToBitmap({
      width: width,
      height: chunkHeight,
      buffer: buffer
    });

    // on success, continue recursive execution
    const onPrintSuccess = async () => {
      if (isLastPass) {
        // end condition
        res.status(200).json({ status: "success" });
      } else {
        // continue condition
        var delay = 15; // sec
        console.log("> Uploaded sketch to Arduino. Continuing in " + delay + " seconds.");
        setTimeout(async () => await printImagePortion(data, chunkHeightDenominator, i + 1), delay * 1000);
      }
    }

    // on failure, notify client
    const onPrintFailure = () => {
      res.status(200).json({ status: "failure" });
    }

    // write .h image file for .ino build
    // compile and upload sketch to Arduino board with conditional PAD_START and PAD_END flags
    await fs.writeFile('arduino/sketches/print/image.h', bitmap)
      .then(() => compileAndUpload({
        buildProperty: (isFirstPass) ? "PAD_START" : (isLastPass) ? "PAD_END" : null,
        onSuccess: onPrintSuccess,
        onFailure: onPrintFailure
      }))
      .catch(err => console.error(err));
  }
}