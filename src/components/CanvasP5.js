import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import sketchASCIIString from '@/helpers/sketchASCIIString';
import convertImageToBitmap from '@/helpers/convertImageToBitmap';

// will only import `react-p5` on client-side
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
});

export default function CanvasSource(props) {
  const {
    title,
    sourceImage,
    sourceImageBase64,
    frameIndex,
    filter,
    edgeDetectionAlgorithm,
    edgeDetectionThreshold,
    characterDensity,
    characterOutputs,
    onSketch,
    webcamEnabled
  } = props;
  
  // expose alias 'my' to store local non-state vars within component instance
  const componentRef = useRef({});
  const { current: my } = componentRef;

  // configure p5 and draw image for the first time
  const setup = (p5, canvasParentRef) => {
    if (!sourceImage) return;

    // set pixel density
    p5.pixelDensity(1);

    // make p5 object and canvas accessible in parent scope
    my.p5 = p5;
    my.canvas = p5.createCanvas(0, 0).parent(canvasParentRef);

    // load and draw image
    p5.loadImage(sourceImage.src, (loadedImage) => {
      my.nativeImage = loadedImage;
      drawImage();
    });
  };

  // draw image
  const drawImage = () => {
    if (!my.p5 || !my.nativeImage) {
      return;
    }

    // set sizes for preview images
    const PREVIEW_IMAGE_WIDTH = 250,
          PREVIEW_IMAGE_HEIGHT = PREVIEW_IMAGE_WIDTH * (my.nativeImage.height / my.nativeImage.width);

    if (0 === my.canvas.width || webcamEnabled) {
      // resize canvas to match width of preview image and height of 3 preview images:
      //   1. unaltered native image
      //   2. presketch image
      //   3. image after sketch processing
      my.canvas.resize(PREVIEW_IMAGE_WIDTH, 3 * PREVIEW_IMAGE_HEIGHT);

      // render preview of unaltered native image
      my.p5.image(my.nativeImage, 0, 0, PREVIEW_IMAGE_WIDTH, PREVIEW_IMAGE_HEIGHT);
    }

    // create pre-sketch image
    my.presketchImage = my.p5.createImage(characterDensity, characterDensity * (my.nativeImage.height / my.nativeImage.width));
    my.presketchImage.copy(my.nativeImage, 0, 0, my.nativeImage.width, my.nativeImage.height, 0, 0, my.presketchImage.width, my.presketchImage.height);

    // TODO: apply filters to pre-sketch image
    // ...

    // render preview of pre-sketch image
    my.p5.image(my.presketchImage, 0, PREVIEW_IMAGE_HEIGHT, PREVIEW_IMAGE_WIDTH, PREVIEW_IMAGE_HEIGHT);

    // --------------------------------------------------------------------------------------------------------------------------------
    // console.log("> my.presketchImage.width", my.presketchImage.width);
    // console.log("> my.presketchImage.height", my.presketchImage.height);
    // console.log("> my.presketchImage.aspectRatio", (my.presketchImage.height / my.presketchImage.width));
    // console.log("> my.nativeImage.width", my.nativeImage.width);
    // console.log("> my.nativeImage.height", my.nativeImage.height);
    // console.log("> my.nativeImage.aspectRatio", (my.nativeImage.height / my.nativeImage.width));
    // --------------------------------------------------------------------------------------------------------------------------------

    // generate ASCII sketch from pre-sketch image
    var { asciiString, edgeImage } = sketchASCIIString({
      p5: my.p5,
      sourceImage: my.presketchImage,
      edgeDetectionAlgorithm,
      edgeDetectionThreshold,
      characterOutputs
    });

    // render preview of image after sketch processing
    my.p5.image(edgeImage, 0, 2 * PREVIEW_IMAGE_HEIGHT, PREVIEW_IMAGE_WIDTH, PREVIEW_IMAGE_HEIGHT);

    // pass asciiString to parent
    if (asciiString) {
      onSketch(asciiString);
    }
  }

  // trigger redraw when certain control vars update
  useEffect(drawImage, [edgeDetectionThreshold, characterDensity, characterOutputs]);

  //
  useEffect(() => {
    if (!my.p5) return;

    // load and draw image
    my.p5.loadImage(sourceImage.src, (loadedImage) => {
      my.nativeImage = loadedImage;
      drawImage();
    });
  }, [sourceImage])

  return(
    <div className="canvas canvas-source">
      <p className="canvas-title">
        {title}
      </p>

      <Sketch setup={setup} />
    </div>
  )
};