import { useEffect, useState } from 'react';
import fitTextToContainer from '@/helpers/fitTextToContainer';

var width = 300;
var height = 300;

export default function CanvasASCII(props) {
  const { title, asciiString } = props;
  const [fontSize, setFontSize] = useState(30);

  var containerRef;

  useEffect(() => {
    if (asciiString) {
      var fittedFontSize = fitTextToContainer(asciiString, 'monospace', containerRef, 30);
      console.log("Got fittedFontSize:", fittedFontSize);
      setFontSize(fittedFontSize);
    }
  }, [asciiString]);

  return(
    <div className="canvas canvas-ascii">
      <p className="canvas-title">
        {title}
      </p>
      
      <div style={{ width, height, background: '#eee' }}>
        <pre ref={ref => containerRef = ref} style={{ width: '100%', height: '100%', fontSize, fontFamily: "monospace"}}>
          { asciiString }
        </pre>
      </div>
    </div>
  )
}