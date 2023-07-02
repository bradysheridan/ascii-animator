import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import processImageSobel from '@/helpers/processImageSobel';

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
});

var width = 200;
var height = 200;

export default function CanvasSource(props) {
  const {
    title,
    sourceImage,
    filter,
    edgeDetectionThreshold,
    onSketch
  } = props;

  const [_p5, set_p5] = useState();
  const [image, setImage] = useState();

  const preload = (p5) => {
  };

  const setup = (p5, canvasParentRef) => {
    set_p5(p5); // expose p5 in parent function allowing it to be used in effects and so on

    p5.pixelDensity(1);
    var canvas = p5.createCanvas(width, height).parent(canvasParentRef);
    canvas.parent().style.width = `${width}px`;
    canvas.parent().style.height = `${height}px`;

    if (sourceImage) {
      p5.loadImage(sourceImage.src, img => {
        setImage(img);
      });
    }
  };

  const draw = (p5) => {
  };

  // preload source image
  useEffect(() => {
    if (_p5 && sourceImage) {
      if (sourceImage.src !== image.src) {
        _p5.loadImage(sourceImage.src, img => {
          setImage(img);
        });
      }
    }
  }, [sourceImage]);

  // draw source image
  useEffect(() => {
    if (_p5 && image) {
      _p5.image(image, 0, 0, width, height);
    }
  }, [image]);

  // apply filter
  useEffect(() => {
    if (_p5 && filter && _p5[filter]) {
      _p5.filter(_p5[filter]);
    }
  }, [filter]);

  // run edge detection
  useEffect(() => {
    if (_p5 && image && edgeDetectionThreshold) {
      var destImage = _p5.createImage(width, height);
      var asciiString = processImageSobel(_p5, image, destImage, edgeDetectionThreshold);
      onSketch(asciiString);
    }
  }, [edgeDetectionThreshold, image]);

  return(
    <div className="canvas canvas-source">
      <p className="canvas-title">
        {title}
      </p>

      <Sketch
        preload={preload}
        setup={setup}
        draw={draw}
      />
    </div>
  )
};