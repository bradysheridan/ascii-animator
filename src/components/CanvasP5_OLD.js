import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import processImageSobel from '@/helpers/processImageSobel';

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
});

var nativeImage;

export default function CanvasSource(props) {
  const {
    title,
    sourceImage,
    filter,
    edgeDetectionThreshold,
    characterDensity,
    onSketch
  } = props;

  const [_p5, set_p5] = useState();
  const [nativeWidth, setNativeWidth] = useState();
  const [nativeHeight, setNativeHeight] = useState();
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [canvas, setCanvas] = useState();
  const [image, setImage] = useState();

  // TODO: Write function description
  const resizeImageAndCanvas = (img, canvas, nativeWidth, nativeHeight) => {
    console.log("CanvasP5 called resizeImageAndCanvas...");

    if (!canvas) {
      console.log("> no canvas found", canvas);
      return;
    }

    // save image's native dimensions
    if (!nativeWidth) {
      var nativeWidth = img.width, nativeHeight = img.height;
      setNativeWidth(img.width);
      setNativeHeight(img.height);
    }

    // calculate local dimensions based on characterDensity
    var localWidth = characterDensity,
        localHeight = localWidth * (nativeHeight / nativeWidth);

    // resize image and canvas to local dimensions
    img.resize(localWidth, localHeight);

    // resize canvas to match image dimensions
    canvas.resize(localWidth, localHeight);
    canvas.parent().style.width = `${localWidth}px`;
    canvas.parent().style.height = `${localHeight}px`;

    // update local state
    setWidth(localWidth);
    setHeight(localHeight);
    setCanvas(canvas);
    setImage(img);

    console.log("> nativeWidth", nativeWidth);
    console.log("> nativeHeight", nativeHeight);
    console.log("> localWidth", localWidth);
    console.log("> localHeight", localHeight);
  }

  // TODO: Write function description
  const renderImage = (image) => {
    if (_p5 && image) {
      console.log("CanvasP5 called renderImage...");
      console.log("> image", image);
      _p5.image(image, 0, 0, image.width, image.height);
      renderSketch();
    }
  };

  // TODO: Write function description
  const renderSketch = () => {
    if (_p5 && image && edgeDetectionThreshold) {
      var sourceImage = _p5.createImage(width, height);
      var destImage = _p5.createImage(width, height);
      sourceImage.copy(nativeImage, 0, 0, nativeImage.width, nativeImage.height, 0, 0, sourceImage.width, sourceImage.height);
      var asciiString = processImageSobel(_p5, sourceImage, destImage, edgeDetectionThreshold);
      onSketch(asciiString);
    };
  }

  // Initialize
  //  - pixel density
  //  - p5 object
  //  - canvas object
  //  - load image
  //  - process image for the first time
  const setup = (p5, canvasParentRef) => {
    if (!sourceImage) return;

    console.log("CanvasP5 called setup function...");

    p5.pixelDensity(1);                     // set pixel density
    set_p5(p5);                             // expose p5 in parent function allowing it to be used in hooks

    // create canvas
    let canvas = p5.createCanvas(0, 0).parent(canvasParentRef);
    // setCanvas(canvas);

    // load and process image
    p5.loadImage(sourceImage.src, (img) => {
      nativeImage = img;
      var mutableImage = p5.createImage(img.width, img.height);
      p5.copy(img, 0, 0, img.width, img.height, 0, 0, mutableImage.width, mutableImage.height);
      resizeImageAndCanvas(mutableImage, canvas);
    });
  };

  // draw source image
  useEffect(() => renderImage(image), [image]);

  // run edge detection
  useEffect(renderSketch, [edgeDetectionThreshold]);
  
  // preload source image
  // useEffect(() => {
  //   if (_p5 && sourceImage && canvas) {
  //     if (sourceImage.src !== image.src) {
  //       _p5.loadImage(sourceImage.src, (img) => resizeImageAndCanvasimg, canvas));
  //     }
  //   }
  // }, [sourceImage]);

  // // apply filter
  // useEffect(() => {
  //   if (_p5 && filter && _p5[filter]) {
  //     _p5.filter(_p5[filter]);
  //   }
  // }, [filter]);

  // update image size based on characterDensity prop
  useEffect(() => {
    resizeImageAndCanvas(image, canvas, nativeWidth, nativeHeight);
    renderSketch();
  }, [characterDensity]);

  return(
    <div className="canvas canvas-source">
      <p className="canvas-title">
        {title}
      </p>

      <Sketch
        setup={setup}
      />
    </div>
  )
};