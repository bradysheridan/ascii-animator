import { createContext, useState } from "react";

export const ControlsContext = createContext();

export const ControlsProvider = (props) => {
  const [selectedFrame, setSelectedFrame] = useState(0);
  const [asciiStrings, setAsciiStrings] = useState([]);
  const [edgeDetectionThreshold, setEdgeDetectionThreshold] = useState(12.5);
  const [filter, setFilter] = useState();
  const [sourceImages, setSourceImages] = useState([]);
  const [animating, setAnimating] = useState(false);

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
        setFilter,
        animating,
        setAnimating
      }}
    >
      {props.children}
    </ControlsContext.Provider>
  );
}