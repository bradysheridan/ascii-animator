import * as htmlToImage from 'html-to-image';
import sendRequest from './sendRequest';

function download(dataurl, filename) {
  if ('undefined' === typeof document) return;
  const link = document.createElement("a");
  link.href = dataurl;
  link.download = filename;
  link.click();
}

export default async function exportSketch(format) {
  var node = document.querySelector("pre");
  
  var width = 600;

  if (!node) return;

  if ("png" === format) {
    htmlToImage.toPng(node, {
      backgroundColor: "white",
      canvasWidth: width,
      canvasHeight: width * (node.clientHeight / node.clientWidth)
    })
    .then((dataUrl) => download(dataUrl, 'sketch.png'));
  }

  if ("print" === format) {
    console.log("Printing...");

    htmlToImage.toPng(node, {
      canvasWidth: width,
      canvasHeight: width * (node.clientHeight / node.clientWidth)
    })
    .then(async (dataUrl) => {
      const res = await sendRequest({ data: dataUrl }, "POST", "/api/print");
      console.log("> res", res);
    });
  }
}