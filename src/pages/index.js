import { useContext } from 'react'
import { ControlsContext } from '@/components/ControlsContext';
import CanvasASCII from '@/components/CanvasASCII';
import CanvasP5 from '@/components/CanvasP5';

const EmptyState = () => (
  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: 'calc(100vh - 100px)', fontSize: '0.75rem', maxWidth: 400, margin: '0 auto' }}>
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
    shouldTraceEdges,
    edgeDetectionAlgorithm,
    edgeDetectionThreshold,
    filter,
    animating,
    characterDensity,
    characterOutputs,
    shadingRamp,
    animationFramerate,
    webcamEnabled,
    propagateChangesToASCIIString
  } = useContext(ControlsContext);

  const renderPresketchCanvas = (frameIndex, sourceImage) => (
    <CanvasP5
      title={`Processed`}
      frameIndex={frameIndex}
      sourceImage={sourceImage.data}
      filter={filter}
      shouldTraceEdges={shouldTraceEdges}
      edgeDetectionAlgorithm={edgeDetectionAlgorithm}
      edgeDetectionThreshold={edgeDetectionThreshold}
      characterDensity={characterDensity}
      characterOutputs={characterOutputs}
      shadingRamp={shadingRamp}
      onSketch={(asciiString) => updateAsciiStrings(draft => { draft[frameIndex] = asciiString })}
    />
  );

  const renderFrames = () => sourceImages.map((sourceImage, frameIndex) => {
    var frameIsSelected = frameIndex === selectedFrame;

    return(
      <div key={`frame-${frameIndex}`} className={["frame", frameIsSelected ? "selected" : ""].join(" ")}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {renderPresketchCanvas(frameIndex, sourceImage)}
        </div>
      </div>
    );
  });

  return(
    <>
      {(0 === sourceImages.length && 0 === asciiStrings.length && !webcamEnabled)
        ? <EmptyState />
        : <>
            {webcamEnabled && sourceVideoStream[0]
              ? renderPresketchCanvas(0, sourceVideoStream[0].data)
              : renderFrames() }

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