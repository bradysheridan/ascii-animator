import { createContext, useState } from "react";

export const ControlsContext = createContext();

export const ControlsProvider = (props) => {
  const [edgeDetectionThreshold, setEdgeDetectionThreshold] = useState(450);
  const [sourceImages, setSourceImages] = useState([]);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [x2, setX2] = useState(0);
  const [y2, setY2] = useState(0);

  return(
    <ControlsContext.Provider
      value={{
        edgeDetectionThreshold,
        setEdgeDetectionThreshold,
        sourceImages,
        setSourceImages,
        x,
        setX,
        y,
        setY,
        x2,
        setX2,
        y2,
        setY2
      }}
    >
      {props.children}
    </ControlsContext.Provider>
  );
}