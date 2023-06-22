var canvas, srcImg, destImg, frameStr;

function preload() {
	// load image
  srcImg = loadImage(SRC_IMG);
}

function setup() {
	// set pixel density
	pixelDensity(1);

	// create and position p5 canvas
  canvas = createCanvas(SKETCH_SIZE, SKETCH_SIZE);
  canvas.parent("p5-canvas-wrap");
	background('red');

	// resize src and dest images
	srcImg.resize(width, (srcImg.height/srcImg.width) * width);
	destImg = createImage(srcImg.width, srcImg.height);

	// only render draw once
	noLoop();
}

function reconfigure(cb) {
  srcImg = loadImage(SRC_IMG, (img) => {
		canvas.resize(SKETCH_SIZE, SKETCH_SIZE);
		srcImg.resize(width, (srcImg.height / srcImg.width) * width);
		destImg = createImage(srcImg.width, srcImg.height);
		redraw();
		if (cb) cb();
	});
}

function draw() {
	// process image, returns plain text sketch
	frameStr = processImageSobel(srcImg, destImg);

	// render processed image
	image(destImg, 0, 0, destImg.width, destImg.height);

	// render sketch
	renderSketch();
}

function renderSketch() {
	// render sketch
	document.querySelector(SKETCH_TARGET_EL_QUERY_SELECTOR).innerHTML = frameStr;

	// resize sketch to fit container
	var fittedFontSize = fitTextToContainer(frameStr, 'monospace', document.querySelector(SKETCH_TARGET_EL_QUERY_SELECTOR), 50);
	document.querySelector(SKETCH_TARGET_EL_QUERY_SELECTOR).style['font-size'] = fittedFontSize + 'px'
	document.querySelector(SKETCH_TARGET_EL_QUERY_SELECTOR).style['line-height'] = 0.6 * fittedFontSize + 'px'
}