import trace from 'trace-ascii-image';

export default function sketchASCIIString(sourceImage, config) {
  sourceImage.loadPixels();
  const { asciiString } = trace(sourceImage.imageData, config);
  return asciiString;
}