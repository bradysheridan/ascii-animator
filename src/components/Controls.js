import { useContext } from 'react';
import { ControlsContext } from '@/components/ControlsContext';
import ControlButton from '@/components/controls/ControlButton';
import ControlDropdown from '@/components/controls/ControlDropdown';
import ControlFile from '@/components/controls/ControlFile';
import ControlFileSession from '@/components/controls/ControlFileSession';
import ControlSelect from './controls/ControlSelect';
import ControlSlider from '@/components/controls/ControlSlider';
import ControlCharArray from '@/components/controls/ControlCharArray';
import ControlText from '@/components/controls/ControlText';
import ControlToggle from '@/components/controls/ControlToggle';
import ControlWebcam from '@/components/controls/ControlWebcam';

import downloadTextFile from '@/helpers/export/downloadTextFile';
import exportAnimation from '@/helpers/export';

export default function Controls() {
  const context = useContext(ControlsContext);
  const {
    selectedFrame,
    setSelectedFrame,
    asciiStrings,
    updateAsciiStrings,
    shouldTraceEdges,
    setShouldTraceEdges,
    edgeCharacter,
    setEdgeCharacter,
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
    <>
      <ControlDropdown label="Input" isExpandedByDefault={true}>
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
            setSourceImages(draft => draft = draft.concat([frameImage]));
          }}
        />

        <ControlFileSession
          label={"Load saved session"}
          onChange={(sessionData) => {
            setSelectedFrame(sessionData.selectedFrame);
            setShouldTraceEdges(sessionData.shouldTraceEdges);
            setEdgeCharacter(sessionData.edgeCharacter);
            setEdgeDetectionThreshold(sessionData.edgeDetectionThreshold);
            setEdgeDetectionAlgorithm(sessionData.edgeDetectionAlgorithm);
            setCharacterDensity(sessionData.characterDensity);
            setShadingRamp(sessionData.shadingRamp);
            setAnimationFramerate(sessionData.animationFramerate);
            setExportFormat(sessionData.exportFormat);
            setSourceImages(sessionData.sourceImages);
            updateAsciiStrings(sessionData.asciiStrings);
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

        <ControlText
          label={"Edge character"}
          name={"edge-character"}
          value={edgeCharacter}
          limit={1}
          onChange={setEdgeCharacter}
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
          unit={"°"}
          min={1}
          max={360}
          step={1}
          value={edgeDetectionThreshold}
          onChange={setEdgeDetectionThreshold}
        />

        <ControlCharArray
          label={"Shading ramp (dark to light)"}
          name={"shading-ramp"}
          characters={shadingRamp}
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

      <ControlDropdown label="Output">
        <ControlButton
          value="Save working session"
          onClick={() => {
            var filename = prompt("Save session as", "session.ascii");
            if (filename) downloadTextFile(JSON.stringify(context), filename);
          }}
        />

        <ControlSelect
          label={"Format"}
          name={"format"}
          values={[
            "embeddable animation (html/js)",
            "png (selected frame)",
            // "png (image sequence)"
          ]}
          onChange={setExportFormat}
        />

        <ControlButton
          value="Export"
          onClick={() => {
            exportAnimation(exportFormat, asciiStrings, animationFramerate);
          }}
        />
      </ControlDropdown>
    </>
  );
}