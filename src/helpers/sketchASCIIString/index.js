import edgeDetectionAlgorithms from './edgeDetectionAlgorithms';
import getSketchChar from './getSketchChar';

export default function sketchASCIIString(params) {
  var {
    p5,
    sourceImage,
    characterOutputs,
    edgeDetectionThreshold,
    edgeDetectionAlgorithm
  } = params;

  // initialize asciiString to empty string
  var asciiString = "";

  /**
    all edge detection algorithms follow this sequence:
      1. load source image into pixel buffer
      2. create edge image
      3. assign each pixel in source image a numerical contrast value
        3.1. write this value to equivalent position in edgeImage
        3.2. pass this value to onPixel callback function
      4. after last pixel on each x axis is evaluted, call onNewLine callback function
      5. return edgeImage
   */
  var edgeImage = edgeDetectionAlgorithms[edgeDetectionAlgorithm]({
    p5,
    sourceImage,
    asciiString,
    onPixel: (result) => {
      // if (!result)
      // if (result) console.log("yes");
      asciiString += (result && result > edgeDetectionThreshold)
        ? getSketchChar(characterOutputs, result)
        : " "
    },
    onNewLine: () => asciiString += "\n",
  });

  // return edgeImage (to be sketched onto preview canvas)
  // and asciiString (to be passed to CanvasASCII and rendered)
  return {
    edgeImage,
    asciiString
  };
}