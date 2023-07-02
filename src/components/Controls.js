import { useContext } from 'react';
import { ControlsContext } from '@/components/ControlsContext';
import ControlButton from '@/components/ControlButton';
import ControlFile from '@/components/ControlFile';
import ControlSlider from '@/components/ControlSlider';
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
    sourceImages,
    setSourceImages,
    filter,
    setFilter,
    animating,
    setAnimating
  } = useContext(ControlsContext);

  return(
    <nav className="controls-wrap">
      <div className="controls-header">
        <h4>* ASCII Tracer</h4>
      </div>

      <Dropdown label="File(s)">
        <ControlFile
          label={"Source image(s)"}
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
      </Dropdown>

      <Dropdown label="Image processing">
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

      <Dropdown label="Animation">
        <ControlButton
          value={animating ? "Stop" : "Start"}
          onClick={() => setAnimating(!animating)}
        />
      </Dropdown>
    </nav>
  );
}