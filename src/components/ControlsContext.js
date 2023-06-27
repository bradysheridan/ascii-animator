import { createContext, useState } from "react";

export const ControlsContext = createContext();

export const ControlsProvider = (props) => {
  const [selectedFrame, setSelectedFrame] = useState(0);
  const [asciiStrings, setAsciiStrings] = useState([]);
  const [edgeDetectionThreshold, setEdgeDetectionThreshold] = useState(20);
  const [filter, setFilter] = useState();
  const [sourceImages, setSourceImages] = useState([]);

  return(
    <ControlsContext.Provider
      value={{
        selectedFrame,
        setSelectedFrame,
        asciiStrings,
        setAsciiStrings,
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