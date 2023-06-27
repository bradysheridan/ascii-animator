import { useEffect, useState } from 'react';
import fitTextToContainer from '@/helpers/fitTextToContainer';

// var width = 300;
// var height = 300;

export default function CanvasASCII(props) {
  const { title, asciiString } = props;

  const [fontSize, setFontSize] = useState(300);
  const [lineHeight, setLineHeight] = useState(30);
  const [width, setWidth] = useState(0);

  // var containerRef;

  useEffect(() => {
    if (asciiString) {
      var fittedFontSize = fitTextToContainer(asciiString, 'monospace', width, 300);
      setFontSize(fittedFontSize);
      setLineHeight(0.62 * fittedFontSize);
    }
  }, [asciiString]);

  return(
    <div className="canvas canvas-ascii">
      <p className="canvas-title">
        {title}
      </p>
      
      <div className="canvas-ascii-pre-wrap" ref={ref => ref && 0 == width ? setWidth(ref.getBoundingClientRect().width * 0.65) : null}>
        <pre  style={{ fontSize: `${fontSize}px`, lineHeight: `${lineHeight}px`, fontFamily: "monospace" }}>
          { asciiString }
        </pre>
      </div>
    </div>
  );
}