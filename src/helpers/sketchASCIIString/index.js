import trace from 'image-to-ascii';

export default function sketchASCIIString(sourceImage, config) {
  sourceImage.loadPixels();
  const { asciiString } = trace(sourceImage.imageData, config);
  return asciiString;
}