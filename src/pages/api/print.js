import fs from 'node:fs/promises';
import { exec } from "node:child_process";
import { Buffer } from 'node:buffer';
import sharp from 'sharp';
import convertImageToBitmap from '@/helpers/convertImageToBitmap';

// compile arduino sketch
const compileAndUpload = (onSuccess, onFailure) => {
  exec("arduino-cli compile -b arduino:avr:uno arduino/sketches/print --output-dir arduino/sketches/print --upload --port /dev/cu.usbmodem1401", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }

    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }

    console.log(`stdout: ${stdout}`);
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
    .trim()
    .png()
    .toBuffer({ resolveWithObject: true });

  // calculate new image dimensions according to max bitmap width supported by printer (384 pixels)
  // note that the maximum width of bitmaps supported by printer is 384px
  var width = 384;
  var height = Math.round(384 * (info.height / info.width));

  // transform image (printer needs high contrast b-w, we extract alpha channel because input is always black on transparent)
  var buffer = await sharp(data)
    .negate()
    .ensureAlpha()
    .threshold()
    .extractChannel(3)
    .resize(width, height)
    .raw()
    .toBuffer();

  // convert buffer to bitmap
  const bitmap = convertImageToBitmap({ width, height, buffer });

  // write .h image file for .ino build
  fs.writeFile('arduino/sketches/print/image.h', bitmap)
    .then(() => compileAndUpload(
      () => res.status(200).json({ status: "success" }),    // on succesful compile/upload
      () => res.status(200).json({ status: "failure" })     // on failed compile/upload
    ))
    .catch(err => console.error(err));
}