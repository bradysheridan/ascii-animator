import { createContext, useState } from "react";
import { useImmer } from "use-immer";

export const ControlsContext = createContext();

export const ControlsProvider = (props) => {
  const [selectedFrame, setSelectedFrame] = useState(0);
  const [asciiStrings, updateAsciiStrings] = useImmer([]);
  const [edgeDetectionThreshold, setEdgeDetectionThreshold] = useState(26.5);
  const [edgeDetectionAlgorithm, setEdgeDetectionAlgorithm] = useState("sobel");
  const [filter, setFilter] = useState();
  const [sourceImages, setSourceImages] = useState([]);
  const [sourceVideoStream, setSourceVideoStream] = useState([]);
  const [animating, setAnimating] = useState(false);
  const [characterDensity, setCharacterDensity] = useState(101);
  const [characterOutputs, setCharacterOutputs] = useState([
    [0, 30, "."],
    [30, 40, "⋆"],
    [40, 70, "+"],
    [70, 100, "★"],
    ["*"]
  ]);
  const [animationFramerate, setAnimationFramerate] = useState(7);
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [webcamRecording, setWebcamRecording] = useState(false);
  const [exportFormat, setExportFormat] = useState("png");
  const [propagateChangesToASCIIString, setPropagateChangesToASCIIString] = useState("none");
  // default to 16:9; when an image or set of images is uploaded, the aspect ratio is automatically set to match the first frame in the image set
  const [aspectRatio, setAspectRatio] = useState("16:9");

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
        setExportFormat,
        propagateChangesToASCIIString,
        setPropagateChangesToASCIIString
      }}
    >
      {props.children}
    </ControlsContext.Provider>
  );
}