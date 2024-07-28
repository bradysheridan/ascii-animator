import { createContext, useState } from "react";
import { useImmer } from "use-immer";

export const ControlsContext = createContext();

export const ControlsProvider = (props) => {
  const [selectedFrame, setSelectedFrame] = useState(0);
  const [asciiStrings, updateAsciiStrings] = useImmer([]);
  const [shouldTraceEdges, setShouldTraceEdges] = useState(false);
  const [edgeCharacter, setEdgeCharacter] = useState("#");
  const [edgeDetectionThreshold, setEdgeDetectionThreshold] = useState(220);
  const [edgeDetectionAlgorithm, setEdgeDetectionAlgorithm] = useState("sobel");
  const [filter, setFilter] = useState();
  const [sourceImages, setSourceImages] = useState([]);
  const [sourceVideoStream, setSourceVideoStream] = useState([]);
  const [animating, setAnimating] = useState(false);
  const [characterDensity, setCharacterDensity] = useState(180);
  const [shadingRamp, setShadingRamp] = useState(["*", "+", ";", ".", "`", ",", " "]);
  const [animationFramerate, setAnimationFramerate] = useState(10);
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [webcamRecording, setWebcamRecording] = useState(false);
  const [exportFormat, setExportFormat] = useState("embeddable animation (html/js)");
  const [propagateChangesToASCIIString, setPropagateChangesToASCIIString] = useState("none");
  
  return(
    <ControlsContext.Provider
      value={{
        selectedFrame,
        setSelectedFrame,
        asciiStrings,
        updateAsciiStrings,
        shouldTraceEdges,
        setShouldTraceEdges,
        edgeCharacter,
        setEdgeCharacter,
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
        shadingRamp,
        setShadingRamp,
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