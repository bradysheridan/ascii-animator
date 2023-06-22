
function processImageSobel(_srcimg, _dstimg, _kernel) {
	var frameStr = "";

	_srcimg.filter(GRAY);

	var k1 = [[-1, 0, 1],
							[-2, 0, 2],
							[-1, 0, 1]];
	var k2 = [[-1, -2, -1],
							[0, 0, 0],
							[1, 2, 1]];
	_srcimg.loadPixels(); // convert the entire canvas to a pixel buffer
	_dstimg.loadPixels(); // convert the entire canvas to a pixel buffer
	
	var w = _srcimg.width;
	var h = _srcimg.height;
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
			var p0 = _srcimg.pixels[ul+1]*k1[0][0]; // upper left
			var p1 = _srcimg.pixels[uc+1]*k1[0][1]; // upper mid
			var p2 = _srcimg.pixels[ur+1]*k1[0][2]; // upper right
			var p3 = _srcimg.pixels[ml+1]*k1[1][0]; // left
			var p4 = _srcimg.pixels[mc+1]*k1[1][1]; // center pixel
			var p5 = _srcimg.pixels[mr+1]*k1[1][2]; // right
			var p6 = _srcimg.pixels[ll+1]*k1[2][0]; // lower left
			var p7 = _srcimg.pixels[lc+1]*k1[2][1]; // lower mid
			var p8 = _srcimg.pixels[lr+1]*k1[2][2]; // lower right
			var r1 = p0+p1+p2+p3+p4+p5+p6+p7+p8; 

			var p0 = _srcimg.pixels[ul+1]*k2[0][0]; // upper left
			var p1 = _srcimg.pixels[uc+1]*k2[0][1]; // upper mid
			var p2 = _srcimg.pixels[ur+1]*k2[0][2]; // upper right
			var p3 = _srcimg.pixels[ml+1]*k2[1][0]; // left
			var p4 = _srcimg.pixels[mc+1]*k2[1][1]; // center pixel
			var p5 = _srcimg.pixels[mr+1]*k2[1][2]; // right
			var p6 = _srcimg.pixels[ll+1]*k2[2][0]; // lower left
			var p7 = _srcimg.pixels[lc+1]*k2[2][1]; // lower mid
			var p8 = _srcimg.pixels[lr+1]*k2[2][2]; // lower right
			var r2 = p0+p1+p2+p3+p4+p5+p6+p7+p8; 

			// 0 is the minimum value the sum could result in and 1414 is the maximum
			var result = map(sqrt(r1*r1+r2*r2),0,1414,0,255);
			
			// write pixels into destination image:
			_dstimg.pixels[mc] = result; 
			_dstimg.pixels[mc+1] = result; 
			_dstimg.pixels[mc+2] = result; 
			_dstimg.pixels[mc+3] = 255;

			// add char to sketch
			if (EDGE_DETECTION_THRESHOLD && result > EDGE_DETECTION_THRESHOLD) {
				frameStr += GET_SKETCH_CHAR(result);
			} else {
				frameStr += SKETCH_SPACE;
			}
		}

		// add newline char to sketch
		frameStr += "\n";
	}
	
	_dstimg.updatePixels(); // update and display the pixel buffer

	return frameStr;
}