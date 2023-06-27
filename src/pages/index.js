import { useContext } from 'react'
import { ControlsContext } from '@/components/ControlsContext';
import CanvasASCII from '@/components/CanvasASCII';
import CanvasP5 from '@/components/CanvasP5';

export default function Index() {
  const {
    selectedFrame,
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
              frameNumber = i + 1,
              frameIsSelected = frameIndex === selectedFrame;

          return(
            <div key={`frame-${i}`} className={["frame", frameIsSelected ? "selected" : ""].join(" ")}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <CanvasP5
                  title={`Frame ${(frameNumber)} - Source`}
                  sourceImage={sourceImage.data}
                />

                <CanvasP5
                  title={`Frame ${(frameNumber)} - Filtered`}
                  sourceImage={sourceImage.data}
                  filter={filter}
                />

                <CanvasP5
                  title={`Frame ${(frameNumber)} - Processed`}
                  sourceImage={sourceImage.data}
                  filter={filter}
                  edgeDetectionThreshold={edgeDetectionThreshold}
                  onSketch={(asciiString) => {
                    var newAsciiStrings = asciiStrings.map(str => str);
                    newAsciiStrings[frameIndex] = asciiString;
                    setAsciiStrings(newAsciiStrings);
                  }}
                />
              </div>

              <CanvasASCII
                title={`Frame ${(i + 1)} - ASCII`}
                asciiString={asciiStrings[frameIndex]}
              />
            </div>
          );
        })
      }
    </>
  );
}