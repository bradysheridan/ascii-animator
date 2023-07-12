import { useEffect, useState } from 'react';
import fitTextToContainer from '@/helpers/fitTextToContainer';

export default function CanvasASCII(props) {
  const {
    asciiStrings,
    animating,
    controlAsciiString,
    selectedFrameIndex
  } = props;

  const [localFrameIndex, setLocalFrameIndex] = useState(selectedFrameIndex);
  const [fontSize, setFontSize] = useState(0);
  const [lineHeight, setLineHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [animationInterval, setAnimationInterval] = useState(null);

  useEffect(() => {
    if (controlAsciiString) {
      var fittedFontSize = fitTextToContainer(controlAsciiString, 'monospace', width),
          fittedLineHeight = 0.62 * fittedFontSize;

      setFontSize(fittedFontSize);
      setLineHeight(fittedLineHeight);
    }
  }, [controlAsciiString]);

  // run animation when 'animating' prop is true
  // stop animation when 'animating' prop is false
  useEffect(() => {
    if (animating) {
      let step = () => setLocalFrameIndex(localFrameIndex => (localFrameIndex + 1 === asciiStrings.length) ? 0 : localFrameIndex + 1);
      let interval = setInterval(step, 150);
      step();
      setAnimationInterval(interval);
    } else {
      clearInterval(animationInterval);
      setAnimationInterval(null);
      setLocalFrameIndex(selectedFrameIndex);
    }
  }, [animating]);

  useEffect(() => {
    if (selectedFrameIndex !== localFrameIndex) {
      setLocalFrameIndex(selectedFrameIndex);
    }
  }, [selectedFrameIndex]);

  return(
    <div className="canvas canvas-ascii">
      <p className="canvas-title">
        {`Frame ${localFrameIndex + 1}`}
      </p>
      
      <div
        className="canvas-ascii-pre-wrap"
        ref={ref => ref && 0 == width ? setWidth(ref.getBoundingClientRect().width * 0.5) : null}
      >
        <pre contentEditable suppressContentEditableWarning style={{ fontSize: `${fontSize}px`, lineHeight: `${lineHeight}px`, fontFamily: "monospace" }}>
          { asciiStrings[localFrameIndex] }
        </pre>
      </div>
    </div>
  );
}