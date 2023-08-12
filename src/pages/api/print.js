import Avrgirl from "avrgirl-arduino";

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

export default async function handler(req, res) {
  const hexBuffer = Buffer.from(hexData.default, 'utf-8');

  await print(hexBuffer)
    .then(() => res.status(200).json({ status: "success", data: hexData.default.substring(0, 30) }))
    .catch((err) => res.status(200).json({ status: "failure", error: err }))
}

/**
 * 1. Receive image from client
 * 2. Convert image to .h format
 * 3. Write image to repo containing .ino file that references it
 * 4. Build .ino file to .hex
 * 5. Upload .hex to Arduino
 */
