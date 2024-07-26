import { useContext } from 'react';
import { ControlsContext } from '@/components/ControlsContext';
import ControlButton from '@/components/controls/ControlButton';
import ControlDropdown from '@/components/controls/ControlDropdown';
import ControlFile from '@/components/controls/ControlFile';
import ControlFileSession from '@/components/controls/ControlFileSession';
import ControlNumericalRangesWithOutputs from '@/components/controls/ControlNumericalRangesWithOutputs';
import ControlSelect from './controls/ControlSelect';
import ControlSlider from '@/components/controls/ControlSlider';
import ControlText from '@/components/controls/ControlText';
import ControlTextSequence from '@/components/controls/ControlTextSequence';
import ControlToggle from '@/components/controls/ControlToggle';
import ControlWebcam from '@/components/controls/ControlWebcam';

import downloadTextFile from '@/helpers/downloadTextFile';
import exportSketch from '@/helpers/exportSketch';

export default function Controls() {
  const context = useContext(ControlsContext);
  const {
    selectedFrame,
    setSelectedFrame,
    asciiStrings,
    updateAsciiStrings,
    shouldTraceEdges,
    setShouldTraceEdges,
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
    shadingRamp,
    setShadingRamp,
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

      <ControlDropdown label="Source">
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
            setShouldTraceEdges(sessionData.shouldTraceEdges);
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
            setSourceImages(draft => draft = draft.concat([frameImage]));
          }}
        />
      </ControlDropdown>

      <ControlDropdown label="Filtering">
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
      </ControlDropdown>

      <ControlDropdown label="Tracing">
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

        <ControlToggle
          label={"Should trace edges?"}
          name={"should-trace-edges"}
          value={shouldTraceEdges}
          onChange={setShouldTraceEdges}
        />

        <ControlSelect
          label={"Edge detection algorithm"}
          name={"edge-detection-algorithm"}
          values={[
            "sobel"
          ]}
          onChange={setEdgeDetectionAlgorithm}
        />

        <ControlSlider
          label={"Edge detection threshold"}
          name={"edge-detection-threshold"}
          unit={"px"}
          min={1}
          max={360}
          step={1}
          value={edgeDetectionThreshold}
          onChange={setEdgeDetectionThreshold}
        />

        <ControlNumericalRangesWithOutputs
          label={"Character output by pixel contrast value"}
          name={"character-outputs"}
          ranges={characterOutputs}
          onChange={setCharacterOutputs}
        />

        <ControlText
          label={"Shading ramp"}
          name={"shading-ramp"}
          value={shadingRamp}
          delimiter={","}
          onChange={setShadingRamp}
        />
      </ControlDropdown>

      <ControlDropdown label="Writing">
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
      </ControlDropdown>

      <ControlDropdown label="Animation">
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
      </ControlDropdown>

      <ControlDropdown label="Export">
        <ControlButton
          value="Save working session"
          onClick={() => {
            var filename = prompt("Save session as", "session.ascii");
            downloadTextFile(JSON.stringify(context), filename);
          }}
        />

        <ControlSelect
          label={"Format"}
          name={"format"}
          values={[
            "png",
          ]}
          onChange={setExportFormat}
        />

        <ControlButton
          value="Export"
          onClick={() => {
            exportSketch(exportFormat);
          }}
        />
      </ControlDropdown>
    </nav>
  );
}