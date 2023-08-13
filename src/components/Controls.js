import { useContext } from 'react';
import { ControlsContext } from '@/components/ControlsContext';
import ControlButton from '@/components/ControlButton';
import ControlWebcam from '@/components/ControlWebcam';
import ControlFile from '@/components/ControlFile';
import ControlSlider from '@/components/ControlSlider';
import ControlNumericalRangesWithOutputs from '@/components/ControlNumericalRangesWithOutputs';
import ControlSelect from './ControlSelect';
import Dropdown from '@/components/Dropdown';
import exportSketch from '@/helpers/exportSketch';

export default function Controls() {
  const {
    selectedFrame,
    setSelectedFrame,
    asciiStrings,
    updateAsciiStrings,
    edgeDetectionThreshold,
    setEdgeDetectionThreshold,
    edgeDetectionAlgorithm,
    setEdgeDetectionAlgorithm,
    sourceImages,
    setSourceImages,
    sourceVideoStream,
    setSourceVideoStream,
    filter,
    setFilter,
    animating,
    setAnimating,
    characterDensity,
    setCharacterDensity,
    characterOutputs,
    setCharacterOutputs,
    animationFramerate,
    setAnimationFramerate,
    webcamEnabled,
    setWebcamEnabled,
    webcamRecording,
    setWebcamRecording,
    exportFormat,
    setExportFormat
  } = useContext(ControlsContext);

  return(
    <nav className="controls-wrap">
      <div className="controls-header">
        <h4>
           ASCII Tracer
        </h4>
      </div>

      <Dropdown label="Source">
        <ControlFile
          label={"Image(s)"}
          name={"source-images"}
          multiple={true}
          disabled={webcamEnabled}
          value={sourceImages}
          onChange={(sourceImages) => {
            setSelectedFrame(0);
            setSourceImages(sourceImages);
            updateAsciiStrings(draft => draft = new Array(sourceImages.length).fill("").map(str => str)); // initialize asciiStrings array
            // console.log("sourceImages:", sourceImages);
          }}
        />

        <ControlFile
          label={"Video (WIP)"}
          name={"video"}
          multiple={false}
          disabled={true}
          value={[]}
          onChange={() => null}
        />

        <ControlWebcam
          webcamEnabled={webcamEnabled}
          webcamRecording={webcamRecording}
          animationFramerate={animationFramerate}
          setWebcamEnabled={setWebcamEnabled}
          setWebcamRecording={setWebcamRecording}
          setSourceVideoStream={setSourceVideoStream}
          recordFrame={(frameImage) => {
            var newSourceImages = sourceImages.concat([frameImage]);
            console.log("-> newSourceImages:", newSourceImages);
            setSourceImages(draft => draft = draft.concat([frameImage]));
          }}
        />
      </Dropdown>

      <Dropdown label="Filtering">
        <ControlSelect
          label={"Filter"}
          name={"filter"}
          tooltip={`Visit [this page](https://p5js.org/reference/#/p5/filter) for descriptions of each filter.`}
          values={[
            "none",
            "THRESHOLD",
            "GRAY",
            "OPAQUE",
            "INVERT",
            "POSTERIZE",
            "BLUR",
            "ERODE",
            "DILATE",
          ]}
          onChange={setFilter}
        />
      </Dropdown>

      <Dropdown label="Tracing">
        <ControlSelect
          label={"Edge detection algorithm"}
          name={"edge-detection-algorithm"}
          values={[
            "basic",
            "sobel"
          ]}
          onChange={setEdgeDetectionAlgorithm}
        />

        <ControlSlider
          label={"Edge detection threshold"}
          name={"edge-detection-threshold"}
          unit={"px"}
          min={1}
          max={45}
          step={0.5}
          value={edgeDetectionThreshold}
          onChange={setEdgeDetectionThreshold}
        />

        <ControlSlider
          label={"Character density"}
          name={"character-density"}
          unit={" per line"}
          min={1}
          max={500}
          step={1}
          value={characterDensity}
          onChange={(val) => setCharacterDensity(parseFloat(val))}
        />

        <ControlNumericalRangesWithOutputs
          label={"Character output by pixel contrast value"}
          name={"character-outputs"}
          ranges={characterOutputs}
          onChange={setCharacterOutputs}
        />
      </Dropdown>

      <Dropdown label="Animation">
        <ControlSlider
          label={"Animation framerate"}
          name={"animation-framerite"}
          unit={" fps"}
          min={1}
          max={100}
          step={1}
          value={animationFramerate}
          onChange={setAnimationFramerate}
        />
      </Dropdown>

      <Dropdown label="Export">
        <ControlSelect
          label={"Format"}
          name={"format"}
          values={[
            "png"
          ]}
          onChange={setExportFormat}
        />

        <ControlButton
          value="Export"
          disabled={sourceImages.length < 1}
          onClick={() => {
            exportSketch(exportFormat);
          }}
        />
      </Dropdown>
    </nav>
  );
}