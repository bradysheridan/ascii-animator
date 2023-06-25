import { useContext } from 'react';
import Dropdown from '@/components/Dropdown';
import ControlFile from '@/components/ControlFile';
import ControlSlider from '@/components/ControlSlider';
import { ControlsContext } from '@/components/ControlsContext';
import ControlSelect from './ControlSelect';

export default function Controls() {
  const {
    edgeDetectionThreshold,
    setEdgeDetectionThreshold,
    sourceImages,
    setSourceImages,
    filter,
    setFilter
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
          onChange={setSourceImages}
        />
      </Dropdown>

      <Dropdown label="Image processing">
        <ControlSlider
          label={"Edge detection threshold"}
          name={"edge-detection-threshold"}
          unit={"px"}
          min={1}
          max={1000}
          step={1}
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
    </nav>
  );
}