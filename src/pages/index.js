import { useContext, useState, useEffect } from 'react'
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
    setAsciiStrings,
    sourceImages,
    edgeDetectionThreshold,
    filter,
    animating,
    characterDensity
  } = useContext(ControlsContext);

  const renderFrames = () => sourceImages.map((sourceImage, i) => {
    var frameIndex = i,
        frameIsSelected = frameIndex === selectedFrame;

    return(
      <div key={`frame-${i}`} className={["frame", frameIsSelected ? "selected" : ""].join(" ")}>
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
            edgeDetectionThreshold={edgeDetectionThreshold}
            characterDensity={characterDensity}
            onSketch={(asciiString) => {
              asciiStrings[frameIndex] = asciiString;
              // console.log(asciiString);
              setAsciiStrings(asciiStrings);
            }}
          />
        </div>
      </div>
    );
  });
  
  return(
    <>
      {(0 === sourceImages.length)
        ? <EmptyState />
        : <>
            {renderFrames()}

            <CanvasASCII
              asciiStrings={asciiStrings}
              animating={animating}
              controlAsciiString={asciiStrings[0]}
              selectedFrameIndex={selectedFrame}
            />
          </>
      }
    </>
  );
}