// https://p5js.org/examples/image-edge-detection.html
// effiency rating: slow
export default function edgeDetectionBasic({
  p5,
  sourceImage,
  onPixel,
  onNewLine
}) {
  // this program analyzes every pixel in an image
  // in relation to the neighbouring pixels
  // to sharpen the image

  // to consider all neighboring pixels we use a 3x3 array
  // and normalize these values
  // kernel is the 3x3 matrix of normalized values
  let kernel = [
    [-1, -1, -1],
    [-1,  9, -1],
    [-1, -1, -1]
  ];

  // convert source image to pixel buffer
  sourceImage.loadPixels();

  // create a new image, same dimensions as sourceImage
  var edgeImage = p5.createImage(sourceImage.width, sourceImage.height);

  // load its pixels
  edgeImage.loadPixels();

  // two for() loops, to iterate in x axis and y axis
  // since the kernel assumes that the pixel
  // has pixels above, under, left, and right
  // we need to skip the first and last column and row
  // x then goes from 1 to width - 1
  // y then goes from 1 to height - 1
  for (let y = 1; y < sourceImage.height - 1; y++) {
    for (let x = 1; x < sourceImage.width - 1; x++) {
      // kernel sum for the current pixel starts as 0
      let sum = 0;

      // kx, ky variables for iterating over the kernel
      // kx, ky have three different values: -1, 0, 1
      for (let kx = -1; kx <= 1; kx++) {
        for (let ky = -1; ky <= 1; ky++) {
          let xpos = x + kx;
          let ypos = y + ky;
          let pos = (y + ky) * sourceImage.width + (x + kx);
          // since our image is grayscale,
          // RGB values are identical
          // we retrieve the green value for this example
          let val = p5.red(sourceImage.get(xpos, ypos));

          // accumulate the  kernel sum
          // kernel is a 3x3 matrix
          // kx and ky have values -1, 0, 1
          // if we add 1 to kx and ky, we get 0, 1, 2
          // with that we can use it to iterate over kernel
          // and calculate the accumulated sum
          sum += kernel[ky + 1][kx + 1] * val;
        }
      }

      // set the pixel value of the edgeImage
      edgeImage.set(x, y, p5.color(sum, sum, sum));

      // once pixel sum result is calculated, call pixel handler
			onPixel(sum);
    }

    onNewLine();
  }

  // updatePixels() to write the changes on edgeImage
  edgeImage.updatePixels();

  return edgeImage;
}