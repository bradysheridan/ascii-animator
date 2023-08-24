// https://idmnyu.github.io/p5.js-image/Edge/index.html
// effiency rating: fast
export default function sobel({
	p5,
	sourceImage,
	onPixel,
	onNewLine
}) {
	// define kernels
	var k1 = [
		[-1, 0, 1],
		[-2, 0, 2],
		[-1, 0, 1]
	];
	var k2 = [
		[-1, -2, -1],
		[0, 0, 0],
		[1, 2, 1]
	];

	// convert source image to pixel buffer
	sourceImage.loadPixels();

  // create a new image, same dimensions as sourceImage
  var edgeImage = p5.createImage(sourceImage.width, sourceImage.height);

  // load its pixels
  edgeImage.loadPixels();

	var w = sourceImage.width;
	var h = sourceImage.height;

	var max = 0;

	for (var y = 0; y < h; y++) {
		for (var x = 0; x < w; x++) {
			// get index positions within pixel list
			// for each pixel position within kernel
			var ul = ((x-1+w)%w + w*((y-1+h)%h))*4; // UPPER LEFT
			var uc = ((x-0+w)%w + w*((y-1+h)%h))*4; // UPPER MID
			var ur = ((x+1+w)%w + w*((y-1+h)%h))*4; // UPPER RIGHT
			var ml = ((x-1+w)%w + w*((y+0+h)%h))*4; // LEFT
			var mc = ((x-0+w)%w + w*((y+0+h)%h))*4; // CENTER PIXEL
			var mr = ((x+1+w)%w + w*((y+0+h)%h))*4; // RIGHT
			var ll = ((x-1+w)%w + w*((y+1+h)%h))*4; // LOWER LEFT
			var lc = ((x-0+w)%w + w*((y+1+h)%h))*4; // LOWER MID
			var lr = ((x+1+w)%w + w*((y+1+h)%h))*4; // LOWER RIGHT
			
			// green channel only
			var px0 = sourceImage.pixels[ul+1]*k1[0][0]; // upper left
			var px1 = sourceImage.pixels[uc+1]*k1[0][1]; // upper mid
			var px2 = sourceImage.pixels[ur+1]*k1[0][2]; // upper right
			var px3 = sourceImage.pixels[ml+1]*k1[1][0]; // left
			var px4 = sourceImage.pixels[mc+1]*k1[1][1]; // center pixel
			var px5 = sourceImage.pixels[mr+1]*k1[1][2]; // right
			var px6 = sourceImage.pixels[ll+1]*k1[2][0]; // lower left
			var px7 = sourceImage.pixels[lc+1]*k1[2][1]; // lower mid
			var px8 = sourceImage.pixels[lr+1]*k1[2][2]; // lower right
			var r1 = px0+px1+px2+px3+px4+px5+px6+px7+px8; 

			var px0 = sourceImage.pixels[ul+1]*k2[0][0]; // upper left
			var px1 = sourceImage.pixels[uc+1]*k2[0][1]; // upper mid
			var px2 = sourceImage.pixels[ur+1]*k2[0][2]; // upper right
			var px3 = sourceImage.pixels[ml+1]*k2[1][0]; // left
			var px4 = sourceImage.pixels[mc+1]*k2[1][1]; // center pixel
			var px5 = sourceImage.pixels[mr+1]*k2[1][2]; // right
			var px6 = sourceImage.pixels[ll+1]*k2[2][0]; // lower left
			var px7 = sourceImage.pixels[lc+1]*k2[2][1]; // lower mid
			var px8 = sourceImage.pixels[lr+1]*k2[2][2]; // lower right
			var r2 = px0+px1+px2+px3+px4+px5+px6+px7+px8; 

			// 0 is the minimum value the sum could result in and 1414 is the maximum
			var result = p5.map(p5.sqrt(r1*r1+r2*r2),0,1414,0,255);

			// if (result > max) max = result;
			
			// write pixel to destination image
			edgeImage.pixels[mc] = result; 
			edgeImage.pixels[mc+1] = result; 
			edgeImage.pixels[mc+2] = result; 
			edgeImage.pixels[mc+3] = 255;

			// once pixel sum result is calculated, call pixel handler
			onPixel(result);
		}

		// once all pixels on this line have been processed, call new line handler
		onNewLine();
	}

	edgeImage.updatePixels();
	
	return edgeImage;
}