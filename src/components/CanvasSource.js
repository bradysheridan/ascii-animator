import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
});

var canvas,
    srcImg;

export default function CanvasSource(props) {
  const { title, sourceImage, x, y } = props;
  const [_p5, set_p5] = useState();
  const [image, setImage] = useState();

  const width = 300,
        height = 300;

  const preload = (p5) => {
  };

  const setup = (p5, canvasParentRef) => {
    set_p5(p5, () => alert('test')); // expose p5 in parent function allowing it to be used in effects and so on
    canvas = p5.createCanvas(width, height).parent(canvasParentRef);
    canvas.parent().style.width = "300px";
    canvas.parent().style.height = "300px";

    if (sourceImage)
      p5.loadImage(sourceImage.src, img => setImage(img));
  };

  const draw = (p5) => {
    p5.background(40);
    p5.ellipse(x, y, 70, 70);
    if (image) p5.image(image, 0, 0, width, height);
  };

  useEffect(() => {
    if (_p5 && sourceImage) {
      if (sourceImage.src !== image.src)
        _p5.loadImage(sourceImage.src, img => setImage(img));
    }
  }, [sourceImage]);

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