SRC_IMG = "/assets/images/default.png";
SKETCH_TARGET_EL_QUERY_SELECTOR = "#plain-text-sketch pre";
SKETCH_SIZE = 200;
EDGE_DETECTION_THRESHOLD = 10;
SKETCH_CHAR = "'";
SKETCH_SPACE = " ";
EMBEDDED_STRING_INDEX = 0;
PIXEL_WEIGHT_MAP = {};
PIXEL_WEIGHTS = [];

GET_SKETCH_CHAR = (pixelWeight, options) => {
  let {
    charsByPixelWeightArr,
    embeddedString
  } = options ? options : {};

  if (!charsByPixelWeightArr) {
    charsByPixelWeightArr = [
      [0, 60, "."],
      [60, 120, "+"],
      [120, 180, "♥"],
      ["*"]
    ];
  }

  // record pixel weight
  // if (!PIXEL_WEIGHT_MAP[Math.floor(pixelWeight)])
  //   PIXEL_WEIGHT_MAP[Math.floor(pixelWeight)] = 0;
  // else
  //   PIXEL_WEIGHT_MAP[Math.floor(pixelWeight)] += 1;

  PIXEL_WEIGHTS.push(pixelWeight);


  // embed words into ASCII sketch output
  if (embeddedString) {
    if (EMBEDDED_STRING_INDEX === embeddedString.length - 1) {
      EMBEDDED_STRING_INDEX = 0;
    } else {
      EMBEDDED_STRING_INDEX++;
    }

    return embeddedString.charAt(EMBEDDED_STRING_INDEX);
  }

  // get char for this pixel based on pixel weight
  for (var i = 0; i < charsByPixelWeightArr.length; i++) {
    // array containing pixel weight range information
    // e.g. [lowerBound, upperBound, char]
    // e.g. [0, 20, "*"]
    let arr = charsByPixelWeightArr[i];

    // if 3 values (lower bound, upper bound, char)
    // try to match pixelWeight to this array
    // return char if a match
    if (arr.length === 3) {
      if (pixelWeight >= arr[0] && pixelWeight <= arr[1]) {
        return arr[2];
      }
    }

    // if 1 value (char with no bounds)
    // assume this array corresponds to uppermost bound
    // return char
    if (arr.length === 1) {
      return arr[0];
    }
  }

  throw `Could not glean pixel's character value from charByPixelWeightArr ${JSON.stringify(charsByPixelWeightArr)}`;
}