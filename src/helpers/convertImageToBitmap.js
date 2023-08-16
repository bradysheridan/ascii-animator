/**
 * 
 * @param {*} img -- width MUST be divisible by 8
 * @returns 
 */
export default function convertImageToBitmap(img) {
  var pixelNum,
      byteNum,
      bytesOnLine = 99,
      x,
      y,
      b,
      rowBytes,
      totalBytes,
      lastBit,
      sum,
      output = "";

  console.log(img.width);
  console.log(img.height);

  // calculate output size
  rowBytes = (img.width) / 8;
  totalBytes = rowBytes * img.height;

  console.log("> rowBytes", rowBytes);
  console.log("> totalBytes", totalBytes);

  // write image dimensions and beginning of array
  output += "#ifndef _image_h_\n";
  output += "#define _image_h_\n";
  output += "\n";
  output += "#define image_width " + img.width + "\n";
  output += "#define image_height " + img.height + "\n";
  output += "\n";
  output += "static const uint8_t PROGMEM image_data[] = {";

  // generate body of array
  for (pixelNum = byteNum = y = 0; y < img.height; y++) {                         // each row
    for (x = 0; x < rowBytes; x++) {                                              // each 8px block within row
      lastBit = (x < rowBytes - 1) ? 1 : (1 << (rowBytes * 8 - img.width));
      sum = 0;                                                                    // clear accumulated 8 bits
      for (b = 128; b >= lastBit; b >>= 1) {                                      // each pixel within block
        if ((img.buffer[pixelNum++] & 1) == 0)
          sum |= b;                                                               // if black pixel, set bit
      }

      if (++bytesOnLine >= 10) {                                                  // wrap nicely
        output += "\n";
        bytesOnLine = 0;
        output += "  ";
      }

      // output += sum;
      output += "0x" + (sum).toString(16).padStart(2, '0').toUpperCase();   // write accumulated bits in 0-padded hexadecimal format
      
      if (++byteNum < totalBytes)
        output += ", ";
      
    }
  }

  // trim off trailing comma
  // output = output.substring(0, output.length - 2);

  // end array
  output += "\n";
  output += "};\n";
  output += "\n";
  output += "#endif // _image_h_";

  return output;
}