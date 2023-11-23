import { useContext } from 'react';
import { ControlsContext } from '@/components/ControlsContext';
import ControlButton from '@/components/ControlButton';
import ControlWebcam from '@/components/ControlWebcam';
import ControlFile from '@/components/ControlFile';
import ControlFileSession from '@/components/ControlFileSession';
import ControlSlider from '@/components/ControlSlider';
import ControlNumericalRangesWithOutputs from '@/components/ControlNumericalRangesWithOutputs';
import ControlSelect from './ControlSelect';
import Dropdown from '@/components/Dropdown';
import downloadTextFile from '@/helpers/downloadTextFile';
import exportSketch from '@/helpers/exportSketch';

export default function Controls() {
  const context = useContext(ControlsContext);
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
    setExportFormat,
    propagateChangesToASCIIString,
    setPropagateChangesToASCIIString
  } = context;

  return(
    <nav className="controls-wrap">
      <div className="controls-header">
        <h4>
           ASCII Tracer
        </h4>
      </div>

      <Dropdown label="Source">
        <ControlFileSession
          label={"Load saved session"}
          onChange={(sessionData) => {
            console.log("Loaded saved session:", sessionData);

            // TODO: This is a rudimentary implementation of session state loading. Only a few of these have been tested.
            setAnimating(false);
            setAnimationFramerate(sessionData.animationFramerate);
            updateAsciiStrings(draft => draft = new Array(sessionData.asciiStrings.length).fill("").map(str => str));
            setCharacterDensity(sessionData.characterDensity);
            setCharacterOutputs(sessionData.characterOutputs);
            setEdgeDetectionAlgorithm(sessionData.edgeDetectionAlgorithm);
            setEdgeDetectionThreshold(sessionData.edgeDetectionThreshold);
            setExportFormat(sessionData.exportFormat);
            setPropagateChangesToASCIIString(sessionData.propagateChangesToASCIIString);
            setSelectedFrame(sessionData.selectedFrame);
            // TODO: Implement setting sourceImages
            setWebcamEnabled(false);
            setWebcamRecording(false);

            setTimeout(() => updateAsciiStrings(sessionData.asciiStrings), 1000);
          }}
        />

        <ControlFile
          label={"Image(s)"}
          name={"source-images"}
          multiple={true}
          disabled={webcamEnabled}
          value={sourceImages}
          onChange={(sourceImages) => {
            setSelectedFrame(0);
            setSourceImages(sourceImages);
            updateAsciiStrings(draft => draft = new Array(sourceImages.length).fill("").map(str => str));
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

      <Dropdown label="Writing">
        <ControlSelect
          label={"Propagate changes to ASCII string"}
          name={"format"}
          values={[
            "none",
            "all frames",
            "frames after this one",
            "frames before this one"
          ]}
          onChange={setPropagateChangesToASCIIString}
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
        <ControlButton
          value="Save working session"
          onClick={() => {
            var filename = prompt("Save session as", "session.ascii");
            if (!filename) return;
            downloadTextFile(JSON.stringify(context), filename);
          }}
        />

        <ControlSelect
          label={"Format"}
          name={"format"}
          values={[
            "png",
            "print"
          ]}
          onChange={setExportFormat}
        />

        <ControlButton
          value="Export"
          onClick={() => {
            exportSketch(exportFormat);
          }}
        />
      </Dropdown>
    </nav>
  );
}