import { useContext } from 'react';
import { ControlsContext } from '@/components/ControlsContext';
import ControlButton from '@/components/ControlButton';
import ControlFile from '@/components/ControlFile';
import ControlSlider from '@/components/ControlSlider';
import ControlNumericalRangesWithOutputs from '@/components/ControlNumericalRangesWithOutputs';
import ControlSelect from './ControlSelect';
import Dropdown from '@/components/Dropdown';

export default function Controls() {
  const {
    selectedFrame,
    setSelectedFrame,
    asciiStrings,
    setAsciiStrings,
    edgeDetectionThreshold,
    setEdgeDetectionThreshold,
    edgeDetectionAlgorithm,
    setEdgeDetectionAlgorithm,
    sourceImages,
    setSourceImages,
    filter,
    setFilter,
    animating,
    setAnimating,
    characterDensity,
    setCharacterDensity,
    characterOutputs,
    setCharacterOutputs,
    animationFramerate,
    setAnimationFramerate
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
          value={sourceImages}
          onChange={(sourceImages) => {
            setSelectedFrame(0);
            setSourceImages(sourceImages);
            // setAsciiStrings(Array(sourceImages.length));

            console.log("Uploaded image...");
            console.log("> selectedFrame", selectedFrame);
            console.log("> sourceImages", sourceImages);
            console.log("> asciiStrings", asciiStrings);
          }}
        />

        <ControlFile
          label={"Video (WIP)"}
          name={"video"}
          multiple={false}
          value={[]}
          onChange={() => null}
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
            "Sobel",
            "X-Direction Kernel (WIP)",
            "Y-Direction Kernel (WIP)"
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
    </nav>
  );
}