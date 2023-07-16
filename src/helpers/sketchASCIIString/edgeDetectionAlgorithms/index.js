const edgeDetectionAlgorithms = {
  basic: require("./basic").default,
  sobel: require("./sobel").default
};

export default edgeDetectionAlgorithms;