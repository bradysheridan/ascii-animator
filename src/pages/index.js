import { useContext } from 'react'
import { ControlsContext } from '@/components/ControlsContext';
import CanvasASCII from '@/components/CanvasASCII';
import CanvasP5 from '@/components/CanvasP5';

export default function Index() {
  const {
    sourceImages,
    filter
  } = useContext(ControlsContext);

  return(
    <>
      {
        sourceImages.map((sourceImage, i) => (
          <div key={`frame-${i}`} style={{ display: 'flex-inline', marginTop: (i === 0) ? 0 : 30  }}>
            <CanvasP5
              title={`Frame ${(i + 1)} - Source`}
              sourceImage={sourceImage.data}
            />

            <CanvasP5
              title={`Frame ${(i + 1)} - Processed`}
              sourceImage={sourceImage.data}
              filter={filter}
            />

            <CanvasASCII
              title={`Frame ${(i + 1)} - ASCII`}
            />
          </div>
        ))
      }
    </>
  );
}