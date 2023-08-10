import Avrgirl from "avrgirl-arduino";

const hexData = require("../../../nodeploy/simple-test-image/build/simple-test-image.ino.hex");

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