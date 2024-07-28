import JSZip from 'jszip';
import FileSaver from 'file-saver';
import * as htmlToImage from 'html-to-image';
import fitTextToContainer from '@/helpers/fitTextToContainer';
import download from '@/helpers/export/download';
import createEmbeddableHTMLSnippet from '@/helpers/export/createEmbeddableHTMLSnippet';

export default async function exportAnimation(format, asciiStrings, animationFramerate) {
  // export embeddable animation
  if ("embeddable animation (html/js)" === format) {
    if (!Array.isArray(asciiStrings) || asciiStrings.length < 1) {
      alert("Can't export because no frames were found.");
      return;
    }

    const zip = new JSZip();
    zip.file('index.html', createEmbeddableHTMLSnippet(animationFramerate));
    zip.file('frames.js', `const frames = [${asciiStrings.map(str => "`" + str.replace(/[`]/gi, '\\`') + "`")}]`);
    zip.file('fitTextToContainer.js', `${fitTextToContainer}`);
    zip.generateAsync({ type: 'blob' }).then(function (content) {
      FileSaver.saveAs(content, 'animation.zip');
    });
  }

  // export image containing the selected frame
  if ("png (selected frame)" === format) {
    var node = document.querySelector("pre");
    if (!node) {
      alert("Can't export becuase the target node 'pre' was not found.");
      return;
    }

    htmlToImage.toPng(node, {
      backgroundColor: "white",
      canvasWidth: 1200,
      canvasHeight: 1200 * (node.clientHeight / node.clientWidth)
    })
    .then((dataUrl) => download(dataUrl, 'sketch.png'));
  }

  // TODO: export sequence of images containing all frames in order
  // if ("png (image sequence)" === format) {
    
  // }
}