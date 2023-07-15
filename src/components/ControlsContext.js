import { createContext, useState } from "react";

export const ControlsContext = createContext();

export const ControlsProvider = (props) => {
  const [selectedFrame, setSelectedFrame] = useState(0);
  const [asciiStrings, setAsciiStrings] = useState([]);
  const [edgeDetectionThreshold, setEdgeDetectionThreshold] = useState(12.5);
  const [edgeDetectionAlgorithm, setEdgeDetectionAlgorithm] = useState("Sobel");
  const [filter, setFilter] = useState();
  const [sourceVideo, setSourceVideo] = useState();
  const [sourceImages, setSourceImages] = useState([]);
  const [animating, setAnimating] = useState(false);
  const [characterDensity, setCharacterDensity] = useState(100);
  const [characterOutputs, setCharacterOutputs] = useState([
    [0, 25, " "],
    [25, 50, "<"],
    [50, 75, "+"],
    [75, 150, "'"],
    ["*"]
  ]);
  const [animationFramerate, setAnimationFramerate] = useState(10);

  return(
    <ControlsContext.Provider
      value={{
        selectedFrame,
        setSelectedFrame,
        asciiStrings,
        setAsciiStrings,
        edgeDetectionThreshold,
        setEdgeDetectionThreshold,
        edgeDetectionAlgorithm,
        setEdgeDetectionAlgorithm,
        sourceVideo,
        setSourceVideo,
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
      }}
    >
      {props.children}
    </ControlsContext.Provider>
  );
}