<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">ASCII Tracer</h3>

  <p align="center">
    A tool for tracing images into ASCII sketches.
  </p>

  <p align="center">
    <a href="https://bradysheridan.com/ascii-tracer">View Demo</a>
    ·
    <a href="https://github.com/bradysheridan/ascii-tracer/issues">Report Bug</a>
    ·
    <a href="https://github.com/bradysheridan/ascii-tracer/issues">Request Feature</a>
  </p>

  <a href="https://github.com/bradysheridan/ascii-tracer">
    <img src="[product-screenshot]" alt="Logo" width="80" height="80">
  </a>
</div>



## 
- Compare P5 and Sharp image source formats. Trying to find a way to bridge the gap between client- and server-side image processing. Want to consolidate the image processing so that the same code works in both environments. Process:
  - Image is loaded into image buffer array
  - Image buffer array is processed according to a given algorithm. Currently:
    - With Sharp:
      - a grayscale pixel map is manually created, calculating the following metadata for each pixel
        - rgbAverage
        - luminocity
        - perceivedLightness
      - once this pixel map is created, sobel edge detection is run on it, adding the following metadata to each pixel
        - gradient magnitude
        - gradient angle
    - With P5: Sobel edge detection is run on the image, chars are output on edges only

- What do I need to do?
  - Need to decide on a standard input data format, one that can be easily generated in both client and server contexts. From there, the image processing code can be run anywhere.
    - Step 1: Determine default Sharp image output format
      > Sharp output format info: https://sharp.pixelplumbing.com/api-output#tobuffer
      > Logging output from Sharp image processing:

    - Step 2: Determine default P5 image output format
      > P5 output format info: 
    - Step 3: Determine how these can be standardized

- End goal: A package that allows for two input methods:
  1. Manually provide image data in an ArrayBuffer
  2. Allow package to generate image data ArrayBuffer itself via Sharp package

## Experimental
- [ ] Dynamic edge detection threshold and char value ranges based on range of image pixel contrast (e.g. calculating average rgb value, min and max edge thresholds, etc.)

## To Do
- [ ] Use requestAnimationFrame instead of setInterval
- [ ] Add filtering and ensure image is drawn from filtered image, not native image
- [ ] Add ability to set background image behind ASCII sketches
- [ ] Add ability to apply CSS filters to bacground image via GUI
- [ ] Add ability to reposition/resize background image via GUI
- [ ] Add ability to invert sketches (filters)
- [ ] Add non-edge based tracing algorithms (e.g. color channels or pixel brightness)
- [ ] Add docs and tooltips pointing to those docs (e.g. explainer for edge detection next to controls for edge detection threshold)

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Brady Sheridan - [Instagram: @brsheridan](https://instagram.com/brsheridan) - dev@bradysheridan.com

Project Link: [https://github.com/bradysheridan/ascii-tracer](https://github.com/bradysheridan/ascii-tracer)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/bradysheridan/ascii-tracer.svg?style=for-the-badge
[contributors-url]: https://github.com/bradysheridan/ascii-tracer/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/bradysheridan/ascii-tracer.svg?style=for-the-badge
[forks-url]: https://github.com/bradysheridan/ascii-tracer/network/members
[stars-shield]: https://img.shields.io/github/stars/bradysheridan/ascii-tracer.svg?style=for-the-badge
[stars-url]: https://github.com/bradysheridan/ascii-tracer/stargazers
[issues-shield]: https://img.shields.io/github/issues/bradysheridan/ascii-tracer.svg?style=for-the-badge
[issues-url]: https://github.com/bradysheridan/ascii-tracer/issues
[license-shield]: https://img.shields.io/github/license/bradysheridan/ascii-tracer.svg?style=for-the-badge
[license-url]: https://github.com/bradysheridan/ascii-tracer/blob/master/LICENSE.txt
[product-screenshot]: public/assets/images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
[p5-url]: https://p5js.org/