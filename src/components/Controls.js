// import { ControlsContext } from '@components/ControlsContext';
import Dropdown from '@/components/Dropdown';
import ControlSlider from '@/components/ControlSlider';
import {ControlsContext} from '@components/ControlsContext';

export default function Controls() {
  // const {
  //   edgeDetectionThreshold,
  //   setEdgeDetectionThreshold
  // } = useContext(ControlsContext);

  console.log(ControlsContext);

  return null;

  // return(
  //   <ControlsContext.Provider>
  //     <nav className="controls-wrap">
  //       <div className="controls-header">
  //         <h4>* ASCII Tracer</h4>
  //       </div>

  //       <Dropdown label="Edge Detection">
  //         <ControlSlider
  //           label={"Edge detection threshold"}
  //           name={"edge-detection-threshold"}
  //           unit={"px"}
  //           min={1}
  //           max={1000}
  //           step={1}
  //           value={edgeDetectionThreshold}
  //           onChange={setEdgeDetectionThreshold}
  //         />
          
  //         {edgeDetectionThreshold}

  //         <p>Option 2</p>
  //         <p>Option 3</p>
  //       </Dropdown>
  //     </nav>
  //   </ControlsContext.Provider>
  // );
}