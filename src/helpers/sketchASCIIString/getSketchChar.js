export default function getSketchChar(characterByPixelWeight, pixelWeight) {
  // get char for this pixel based on pixel weight
  for (var i = 0; i < characterByPixelWeight.length; i++) {
    // array containing pixel weight range information
    // e.g. [lowerBound, upperBound, char]
    // e.g. [0, 20, "*"]
    let arr = characterByPixelWeight[i];

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

  throw `Could not get pixel's character value from charByPixelWeightArr ${JSON.stringify(characterByPixelWeight)}`;
}