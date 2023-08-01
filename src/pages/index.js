import { useContext, useState, useEffect } from 'react'
import { useImmer } from 'use-immer'
import { ControlsContext } from '@/components/ControlsContext';
import CanvasASCII from '@/components/CanvasASCII';
import CanvasP5 from '@/components/CanvasP5';
import Webcam from '@/components/Webcam';

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
    edgeDetectionAlgorithm,
    edgeDetectionThreshold,
    filter,
    animating,
    characterDensity,
    characterOutputs,
    animationFramerate,
    webcamEnabled
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
  
  return(
    <>
      {(0 === sourceImages.length)
        ? <Webcam
            webcamEnabled={webcamEnabled}
          />
          // <EmptyState />
        : <>
            {renderFrames()}

            <CanvasASCII
              asciiStrings={asciiStrings}
              animating={animating}
              animationFramerate={animationFramerate}
              controlAsciiString={asciiStrings[0]}
              selectedFrameIndex={selectedFrame}
            />
          </>
      }
    </>
  );
}