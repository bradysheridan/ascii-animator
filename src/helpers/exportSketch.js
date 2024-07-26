import * as htmlToImage from 'html-to-image';
import download from './download';

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
}