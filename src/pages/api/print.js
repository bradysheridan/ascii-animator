import fs from 'fs';
import { Buffer } from 'node:buffer';
import Avrgirl from "avrgirl-arduino";
import sharp from 'sharp';
import convertImageToBitmap from '@/helpers/convertImageToBitmap';

const hexData = require("../../../nodeploy/simple-test-image/build/arduino.avr.uno/simple-test-image.ino.hex");

const avrgirl = new Avrgirl({
  board: 'uno',
  debug: true
});

const print = hexBuffer => new Promise((resolve, reject) => {
  avrgirl.flash(hexBuffer, function(error) {
    if (error) reject(error);
    else resolve();
  });
});

/**
 * 1. Receive image from client
 * 2. Convert image to .h format
 * 3. Write image to repo containing .ino file that references it
 * 4. Build .ino file to .hex
 * 5. Upload .hex to Arduino
 */
export default async function handler(req, res) {
  var base64Url = req.body.data;
  var base64Str = base64Url.split(',')[1];
  var base64Buffer = Buffer.from(base64Str, 'base64');

  // where'd you leave off?
  // you got things working solid
  // need to find the right combination of sharp operaitons
  // for good output. you generate some good stuff but currently
  // black boxes being printed. return to alpha channel extraction.

  // load image and trim off whitespace
  var { data, info } = await sharp(base64Buffer)
    .trim()
    .png()
    .toBuffer({ resolveWithObject: true });

  console.log(data);
  console.log(info);

  // calculate new dimensions
  // note that the maximum width of bitmaps supported by printer is 384px
  var width = 384;
  var height = Math.round(384 * (info.height / info.width));

  // transform image
  var buffer = await sharp(data)
    .negate()
    .ensureAlpha()
    .extractChannel(3)
    .resize(width, height)
    .raw()
    .toBuffer();

  // convert buffer to bitmap
  const bitmap = convertImageToBitmap({ width, height, buffer });

  // write .h image file for .ino build
  fs.writeFile('./nodeploy/simple-test-image/image.h', bitmap, err => (err) ? console.error(err) : null);

  // await print(hexBuffer)
  //   .then(() => res.status(200).json({ status: "success", data: hexData.default.substring(0, 30) }))
  //   .catch((err) => res.status(200).json({ status: "failure", error: err }))
}