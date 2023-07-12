import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import processImageSobel from '@/helpers/processImageSobel';

// will only import `react-p5` on client-side
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
});

const PREVIEW_IMAGE_WIDTH = 250;

export default function CanvasSource(props) {
  const {
    title,
    sourceImage,
    frameIndex,
    filter,
    edgeDetectionThreshold,
    characterDensity,
    onSketch
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
    if (!my.p5) return;

    // create preview image (fixed size)
    my.previewImage = my.p5.createImage(PREVIEW_IMAGE_WIDTH, PREVIEW_IMAGE_WIDTH * (my.nativeImage.height / my.nativeImage.width));
    my.previewImage.copy(my.nativeImage, 0, 0, my.nativeImage.width, my.nativeImage.height, 0, 0, my.previewImage.width, my.previewImage.height);

    // resize canvas to match preview image
    my.canvas.resize(my.previewImage.width, my.previewImage.height);

    // render preview image
    my.p5.image(my.previewImage, 0, 0, my.previewImage.width, my.previewImage.height);

    // create pre-sketch image
    my.presketchImage = my.p5.createImage(characterDensity, characterDensity * (my.nativeImage.height / my.nativeImage.width));
    my.presketchImage.copy(my.nativeImage, 0, 0, my.nativeImage.width, my.nativeImage.height, 0, 0, my.presketchImage.width, my.presketchImage.height);

    // generate ASCII sketch from pre-sketch image
    my.asciiString = processImageSobel(my.p5, my.presketchImage, my.p5.createImage(my.presketchImage.width, my.presketchImage.height), edgeDetectionThreshold);

    if (my.asciiString) {
      onSketch(my.asciiString);
    }
  }

  // edgeDetectoinThreshold, characterDensity trigger redraws
  useEffect(drawImage, [edgeDetectionThreshold, characterDensity]);

  return(
    <div className="canvas canvas-source">
      <p className="canvas-title">
        {title}
      </p>

      <Sketch setup={setup} />
    </div>
  )
};