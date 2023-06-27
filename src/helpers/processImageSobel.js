export default function processImageSobel(_p5, sourceImage, destImage, edgeDetectionThreshold) {
	var frameStr = "";

	var k1 = [[-1, 0, 1],
						[-2, 0, 2],
						[-1, 0, 1]];

	var k2 = [[-1, -2, -1],
						[0, 0, 0],
						[1, 2, 1]];

	sourceImage.loadPixels(); // convert the entire canvas to a pixel buffer
	destImage.loadPixels(); 	// convert the entire canvas to a pixel buffer
	
	var w = sourceImage.width;
	var h = sourceImage.height;
	for (var y = 0; y < h; y++) {
		for (var x = 0; x < w; x++) {
		
			// INDEX POSITION IN PIXEL LIST
			var ul = ((x-1+w)%w + w*((y-1+h)%h))*4; // location of the UPPER LEFT
			var uc = ((x-0+w)%w + w*((y-1+h)%h))*4; // location of the UPPER MID
			var ur = ((x+1+w)%w + w*((y-1+h)%h))*4; // location of the UPPER RIGHT
			var ml = ((x-1+w)%w + w*((y+0+h)%h))*4; // location of the LEFT
			var mc = ((x-0+w)%w + w*((y+0+h)%h))*4; // location of the CENTER PIXEL
			var mr = ((x+1+w)%w + w*((y+0+h)%h))*4; // location of the RIGHT
			var ll = ((x-1+w)%w + w*((y+1+h)%h))*4; // location of the LOWER LEFT
			var lc = ((x-0+w)%w + w*((y+1+h)%h))*4; // location of the LOWER MID
			var lr = ((x+1+w)%w + w*((y+1+h)%h))*4; // location of the LOWER RIGHT
			
			// green channel only
			var p0 = sourceImage.pixels[ul+1]*k1[0][0]; // upper left
			var p1 = sourceImage.pixels[uc+1]*k1[0][1]; // upper mid
			var p2 = sourceImage.pixels[ur+1]*k1[0][2]; // upper right
			var p3 = sourceImage.pixels[ml+1]*k1[1][0]; // left
			var p4 = sourceImage.pixels[mc+1]*k1[1][1]; // center pixel
			var p5 = sourceImage.pixels[mr+1]*k1[1][2]; // right
			var p6 = sourceImage.pixels[ll+1]*k1[2][0]; // lower left
			var p7 = sourceImage.pixels[lc+1]*k1[2][1]; // lower mid
			var p8 = sourceImage.pixels[lr+1]*k1[2][2]; // lower right
			var r1 = p0+p1+p2+p3+p4+p5+p6+p7+p8; 

			var p0 = sourceImage.pixels[ul+1]*k2[0][0]; // upper left
			var p1 = sourceImage.pixels[uc+1]*k2[0][1]; // upper mid
			var p2 = sourceImage.pixels[ur+1]*k2[0][2]; // upper right
			var p3 = sourceImage.pixels[ml+1]*k2[1][0]; // left
			var p4 = sourceImage.pixels[mc+1]*k2[1][1]; // center pixel
			var p5 = sourceImage.pixels[mr+1]*k2[1][2]; // right
			var p6 = sourceImage.pixels[ll+1]*k2[2][0]; // lower left
			var p7 = sourceImage.pixels[lc+1]*k2[2][1]; // lower mid
			var p8 = sourceImage.pixels[lr+1]*k2[2][2]; // lower right
			var r2 = p0+p1+p2+p3+p4+p5+p6+p7+p8; 

			// 0 is the minimum value the sum could result in and 1414 is the maximum
			var result = _p5.map(_p5.sqrt(r1*r1+r2*r2),0,1414,0,255);
			
			// write pixels into destination image:
			destImage.pixels[mc] = result; 
			destImage.pixels[mc+1] = result; 
			destImage.pixels[mc+2] = result; 
			destImage.pixels[mc+3] = 255;

			// add char to sketch
			if (edgeDetectionThreshold && result > edgeDetectionThreshold) {
				frameStr += "*";
			} else {
				frameStr += " ";
			}
		}

		// add newline char to sketch
		frameStr += "\n";
	}
	
	destImage.updatePixels(); // update and display the pixel buffer

	return frameStr;
}