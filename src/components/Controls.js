import { useContext } from 'react';
import Dropdown from '@/components/Dropdown';
import ControlFile from '@/components/ControlFile';
import ControlSlider from '@/components/ControlSlider';
import { ControlsContext } from '@/components/ControlsContext';

export default function Controls() {
  const {
    edgeDetectionThreshold,
    setEdgeDetectionThreshold,
    sourceImages,
    setSourceImages
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
      </Dropdown>
    </nav>
  );
}