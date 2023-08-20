import { useContext } from 'react'
import { ControlsContext } from '@/components/ControlsContext';
import CanvasASCII from '@/components/CanvasASCII';
import CanvasP5 from '@/components/CanvasP5';

const EmptyState = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: 'calc(100vh - 100px)' }}>
    <p>
      empty state
    </p>
  </div>
);

export default function Index() {
  const {
    selectedFrame,
    asciiStrings,
    updateAsciiStrings,
    sourceImages,
    sourceVideoStream,
    edgeDetectionAlgorithm,
    edgeDetectionThreshold,
    filter,
    animating,
    characterDensity,
    characterOutputs,
    animationFramerate,
    webcamEnabled,
    propagateChangesToASCIIString
  } = useContext(ControlsContext);

  const renderFrames = () => sourceImages.map((sourceImage, frameIndex) => {
    var frameIsSelected = frameIndex === selectedFrame;

    return(
      <div key={`frame-${frameIndex}`} className={["frame", frameIsSelected ? "selected" : ""].join(" ")}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* <CanvasP5
            title={`Source`}
            frameIndex={frameIndex}
            sourceImage={sourceImage.data}
            characterDensity={characterDensity}
          />

          <CanvasP5
            title={`Filtered`}
            frameIndex={frameIndex}
            sourceImage={sourceImage.data}
            filter={filter}
            characterDensity={characterDensity}
          /> */}

          <CanvasP5
            title={`Processed`}
            frameIndex={frameIndex}
            sourceImage={sourceImage.data}
            filter={filter}
            edgeDetectionAlgorithm={edgeDetectionAlgorithm}
            edgeDetectionThreshold={edgeDetectionThreshold}
            characterDensity={characterDensity}
            characterOutputs={characterOutputs}
            onSketch={(asciiString) => updateAsciiStrings(draft => { draft[frameIndex] = asciiString })}
          />
        </div>
      </div>
    );
  });

  // console.log("webcamEnabled", webcamEnabled);
  // console.log("sourceVideoStream", sourceVideoStream);

  return(
    <>
      {(0 === sourceImages.length && !webcamEnabled)
        ? <EmptyState />
        : <>
            {webcamEnabled && sourceVideoStream[0]
              ? <CanvasP5
                  // key={`asdf-${Math.random()}`}
                  title={`Processed`}
                  frameIndex={0}
                  sourceImage={sourceVideoStream[0].data}
                  filter={filter}
                  edgeDetectionAlgorithm={edgeDetectionAlgorithm}
                  edgeDetectionThreshold={edgeDetectionThreshold}
                  characterDensity={characterDensity}
                  characterOutputs={characterOutputs}
                  webcamEnabled={webcamEnabled}
                  onSketch={(asciiString) => updateAsciiStrings(draft => { draft[0] = asciiString })}
                />
              : renderFrames()
            }

            <CanvasASCII
              asciiStrings={asciiStrings}
              animating={animating}
              animationFramerate={animationFramerate}
              controlAsciiString={asciiStrings[0]}
              selectedFrameIndex={selectedFrame}
              propagateChangesToASCIIString={propagateChangesToASCIIString}
              onChange={(updatedAsciiString, frameIndex) => updateAsciiStrings(draft => { draft[frameIndex] = updatedAsciiString })}
              onChangeBatch={(changes) => updateAsciiStrings(draft => changes.forEach(({ updatedAsciiString, frameIndex }) => {
                draft[frameIndex] = updatedAsciiString;
              }))}
            />
          </>
      }
    </>
  );
}