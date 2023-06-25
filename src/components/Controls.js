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
    setSourceImages,
    // tests
    x,
    setX,
    y,
    setY,
    x2,
    setX2,
    y2,
    setY2
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

      <Dropdown label="Test controls">
        <ControlSlider
          label={"Circle X"}
          name={"circle-x"}
          unit={"px"}
          min={1}
          max={300}
          step={1}
          value={x}
          onChange={setX}
        />

        <ControlSlider
          label={"Circle Y"}
          name={"circle-y"}
          unit={"px"}
          min={1}
          max={300}
          step={1}
          value={y}
          onChange={setY}
        />

        <ControlSlider
          label={"Circle X 2"}
          name={"circle-x-2"}
          unit={"px"}
          min={1}
          max={300}
          step={1}
          value={x2}
          onChange={setX2}
        />

        <ControlSlider
          label={"Circle Y 2"}
          name={"circle-y-2"}
          unit={"px"}
          min={1}
          max={300}
          step={1}
          value={y2}
          onChange={setY2}
        />
      </Dropdown>
    </nav>
  );
}