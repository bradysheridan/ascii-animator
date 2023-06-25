import { useContext } from 'react'
import { ControlsContext } from '@/components/ControlsContext';
import CanvasSource from '@/components/CanvasSource';

export default function Index() {
  const {
    sourceImages,
    x,
    y,
    x2,
    y2
  } = useContext(ControlsContext);

  return(
    <>
      {
        sourceImages.map((sourceImage, i) => (
          <div key={`frame-${i}`} style={{ display: 'flex-inline', width: 'auto', marginTop: (i === 0) ? 0 : 30  }}>
            <CanvasSource
              title={`Frame ${(i + 1)} - Source`}
              sourceImage={sourceImage.data}
            />

            <CanvasSource
              title={`Frame ${(i + 1)} - Sketch`}
              x={x}
              y={y}
            />
          </div>
        ))
      }

      {/* <CanvasSource
        x={x}
        y={y}
        sourceImages={sourceImages}
      />

      <CanvasSource
        x={x2}
        y={y2}
      /> */}
    </>
  );
}