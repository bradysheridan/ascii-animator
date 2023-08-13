import * as htmlToImage from 'html-to-image';

function download(dataurl, filename) {
  if ('undefined' === typeof document) return;
  const link = document.createElement("a");
  link.href = dataurl;
  link.download = filename;
  link.click();
}

export default function exportSketch(format) {
  var node = document.querySelector("pre");
  var width = 1280;

  if (!node) return;

  htmlToImage.toPng(node, {
    canvasWidth: width,
    canvasHeight: width * (node.clientHeight / node.clientWidth)
  })
  .then((dataUrl) => download(dataUrl, 'sketch.png'));
}