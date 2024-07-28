import { useContext } from 'react';
import { ControlsContext } from '@/components/ControlsContext';
import CanvasASCII from '@/components/CanvasASCII';
import CanvasP5 from '@/components/CanvasP5';
import Nav from '@/components/Nav';

const EmptyState = () => (
  <div className="relative w-full">
    <div className="empty-state">
      <div className="relative">
        <p>
          Welcome to the ASCII Animator, an open-source tool <br />for creating plain text animations in the style of ASCII art.
        </p>

        <Nav />

        <p className="mt-2">
          To get started, upload your source files on the top left.
        </p>

        <div className="absolute bottom-[-30px] left-[-18px] text-lg text-monospace">
          <pre className="text-[14px] leading-[15px]">
            {`O
/|- 🫴
/ \\`}
          </pre>
        </div>
      </div>
    </div>
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
    edgeCharacter,
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
      edgeCharacter={edgeCharacter}
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
              ? renderPresketchCanvas(0, sourceVideoStream[0])
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