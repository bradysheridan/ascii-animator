import { createContext, useState } from "react";
import { useImmer } from "use-immer";

export const ControlsContext = createContext();

export const ControlsProvider = (props) => {
  const [selectedFrame, setSelectedFrame] = useState(0);
  const [asciiStrings, updateAsciiStrings] = useImmer([]);
  const [edgeDetectionThreshold, setEdgeDetectionThreshold] = useState(12.5);
  const [edgeDetectionAlgorithm, setEdgeDetectionAlgorithm] = useState("sobel");
  const [filter, setFilter] = useState();
  const [sourceImages, setSourceImages] = useState([]);
  const [sourceVideoStream, setSourceVideoStream] = useState([]);
  const [animating, setAnimating] = useState(false);
  const [characterDensity, setCharacterDensity] = useState(141);
  const [characterOutputs, setCharacterOutputs] = useState([
    [0, 25, " "],
    [25, 50, "<"],
    [50, 75, "+"],
    [75, 150, "'"],
    ["*"]
  ]);
  const [animationFramerate, setAnimationFramerate] = useState(7);
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [webcamRecording, setWebcamRecording] = useState(false);
  const [exportFormat, setExportFormat] = useState("png");

  return(
    <ControlsContext.Provider
      value={{
        selectedFrame,
        setSelectedFrame,
        asciiStrings,
        updateAsciiStrings,
        edgeDetectionThreshold,
        setEdgeDetectionThreshold,
        edgeDetectionAlgorithm,
        setEdgeDetectionAlgorithm,
        sourceImages,
        setSourceImages,
        sourceVideoStream,
        setSourceVideoStream,
        filter,
        setFilter,
        animating,
        setAnimating,
        characterDensity,
        setCharacterDensity,
        characterOutputs,
        setCharacterOutputs,
        animationFramerate,
        setAnimationFramerate,
        webcamEnabled,
        setWebcamEnabled,
        webcamRecording,
        setWebcamRecording,
        exportFormat,
        setExportFormat
      }}
    >
      {props.children}
    </ControlsContext.Provider>
  );
}