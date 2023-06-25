import { useContext } from 'react'
import { ControlsContext } from '@/components/ControlsContext';
import CanvasASCII from '@/components/CanvasASCII';
import CanvasP5 from '@/components/CanvasP5';

export default function Index() {
  const {
    asciiStrings,
    setAsciiStrings,
    sourceImages,
    edgeDetectionThreshold,
    filter
  } = useContext(ControlsContext);

  return(
    <>
      {
        sourceImages.map((sourceImage, i) => {
          var frameIndex = i,
              frameNumber = i + 1;

          return(
            <div key={`frame-${i}`} style={{ display: 'flex-inline', marginTop: (i === 0) ? 0 : 30  }}>
              <CanvasP5
                title={`Frame ${(i + 1)} - Source`}
                sourceImage={sourceImage.data}
              />

              <CanvasP5
                title={`Frame ${(i + 1)} - Filtered`}
                sourceImage={sourceImage.data}
                filter={filter}
              />

              <CanvasP5
                title={`Frame ${(i + 1)} - Processed`}
                sourceImage={sourceImage.data}
                filter={filter}
                edgeDetectionThreshold={edgeDetectionThreshold}
                onSketch={(asciiString) => {
                  var newAsciiStrings = asciiStrings.map(str => str);
                  newAsciiStrings[frameIndex] = asciiString;
                  console.log("CanvasP5 onSketch callback got newAsciiStrings:", newAsciiStrings);
                  setAsciiStrings(newAsciiStrings);
                }}
              />

              <CanvasASCII
                title={`Frame ${(i + 1)} - ASCII`}
                asciiString={asciiStrings[frameIndex]}
              />
            </div>
          )
        })
      }
    </>
  );
}