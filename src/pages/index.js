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

    <div id="test1">
      <p>
        Lorem ispum
        <br />
        Yada yada...
      </p>
    </div>

    <div id="test2" style={{display: 'flex', flexDirection: 'space-around', justifyContent: 'center', alignItems: 'center', width: '100px', height: '100px', border: '10px solid red'}}>
      <div style={{ width: 40, height: 40, backgroundColor: 'blue'}}></div>
      <div style={{ width: 25, height: 25, marginLeft: 12, backgroundColor: 'green'}}></div>
    </div>

    <div id="test3" style={{width: '100px', height: '100px'}}>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa19kTSu_b4ZdT-xtJ0AwGHTDstF3IaPiICxhccvEjelgBD0fe7d3_2FYsWp4gdKK4WdY&usqp=CAU" style={{width: '100%', height: '100%'}}></img>
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
            />
          </>
      }
    </>
  );
}