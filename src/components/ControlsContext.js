import { createContext, useState } from "react";

const ControlsContext = createContext();

  // const ControlsProvider = (props) => {
  //   const [edgeDetectionThreshold, setEdgeDetectionThreshold] = useState(450);

  //   return(
  //     <ControlsContext.Provider
  //       value={{
  //         edgeDetectionThreshold,
  //         setEdgeDetectionThreshold
  //       }}
  //     >
  //       {props.children}
  //     </ControlsContext.Provider>
  //   );
  // }

module.exports = {
  ControlsContext,
  // ControlsProvider
}