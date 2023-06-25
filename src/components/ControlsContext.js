import { createContext, useState } from "react";

export const ControlsContext = createContext();

export const ControlsProvider = (props) => {
  const [edgeDetectionThreshold, setEdgeDetectionThreshold] = useState(450);
  const [sourceImages, setSourceImages] = useState([]);
  const [filter, setFilter] = useState();
  return(
    <ControlsContext.Provider
      value={{
        edgeDetectionThreshold,
        setEdgeDetectionThreshold,
        sourceImages,
        setSourceImages,
        filter,
        setFilter
      }}
    >
      {props.children}
    </ControlsContext.Provider>
  );
}