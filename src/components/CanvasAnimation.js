import { useEffect, useState } from 'react';
import fitTextToContainer from '@/helpers/fitTextToContainer';

export default function CanvasAnimation(props) {
  const { title, asciiString } = props;
  const [fontSize, setFontSize] = useState(300);
  const [lineHeight, setLineHeight] = useState(30);
  const [width, setWidth] = useState(400);

  useEffect(() => {
    console.log("ASCII string updated in CanvasASCII...");
    console.log("> asciiString", asciiString);
    console.log(width);
    
    if (asciiString) {
      var fittedFontSize = fitTextToContainer(asciiString, 'monospace', width, 300),
          fittedLineHeight = 0.62 * fittedFontSize;

      setFontSize(fittedFontSize);
      setLineHeight(fittedLineHeight);

      console.log("Fitted font size and line height...");
      console.log("> Font size:", fittedFontSize);
      console.log("> Line height:", fittedLineHeight);
    }
  }, [asciiString]);

  return(
    <div className="canvas canvas-ascii">
      <p className="canvas-title">
        {title}
      </p>
      
      <div className="canvas-ascii-pre-wrap">
        <pre style={{ fontSize: `${fontSize}px`, lineHeight: `${lineHeight}px`, fontFamily: "monospace" }}>
          { asciiString }
        </pre>
      </div>
    </div>
  );
}