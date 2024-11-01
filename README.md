<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<div align="center">
  <h3 align="center">ASCII Animator</h3>

  <p align="center">
    An open-source tool for creating plain text animations in the style of ASCII art
  </p>

  <p align="center">
    <a href="https://ascii-animator.com">Website</a>
    ·
    <a href="https://github.com/bradysheridan/ascii-animator/issues">Report Bug</a>
    ·
    <a href="https://github.com/bradysheridan/ascii-animator/issues">Request Feature</a>
  </p>
</div>

## About

The original intent behind this tool was to generate plain text/ASCII art animations for web design projects. It works by tracing an image sequence into an array of strings that are rendered as pre elements and looped with Javascript. From that foundation, the ASCII Animator is being expanded to include more features and export formats.

This project is being developed in tandem with the [trace-ascii-image](https://github.com/bradysheridan/trace-ascii-image) npm module.

## To Do
- [ ] Migrate all styles to Tailwind
- [ ] Use requestAnimationFrame instead of setInterval
- [ ] Look into dynamic weighting during tracing based on variance of source image pixels across various parameters (e.g. luminosity)

## Resources
- [Algorithms for subpixel registrations](https://www.sciencedirect.com/science/article/abs/pii/0734189X86900289)
- [Subpixel Sampling](https://bit-101.com/blog/posts/2024-04-09/subpixel-sampling/)

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- CONTACT -->
## Contact

Brady Sheridan - dev@bradysheridan.com - [bradysheridan.com](https://www.bradysheridan.com/) - [@brsheridan](https://instagram.com/brsheridan)

Project Links: [ASCII Animator (Website)](https://ascii-animator.com/) - [ASCII Animator (Github)](https://github.com/bradysheridan/ascii-animator) - [trace-ascii-image (Github)](https://github.com/bradysheridan/trace-ascii-image) - [trace-ascii-image (npm)](https://www.npmjs.com/package/trace-ascii-image)

[Github](https://github.com/bradysheridan/trace-ascii-image) - [npm](https://www.npmjs.com/package/trace-ascii-image)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/bradysheridan/ascii-animator.svg?style=for-the-badge
[contributors-url]: https://github.com/bradysheridan/ascii-animator/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/bradysheridan/ascii-animator.svg?style=for-the-badge
[forks-url]: https://github.com/bradysheridan/ascii-animator/network/members
[stars-shield]: https://img.shields.io/github/stars/bradysheridan/ascii-animator.svg?style=for-the-badge
[stars-url]: https://github.com/bradysheridan/ascii-animator/stargazers
[issues-shield]: https://img.shields.io/github/issues/bradysheridan/ascii-animator.svg?style=for-the-badge
[issues-url]: https://github.com/bradysheridan/ascii-animator/issues
[license-shield]: https://img.shields.io/github/license/bradysheridan/ascii-animator.svg?style=for-the-badge
[license-url]: https://github.com/bradysheridan/ascii-animator/blob/master/LICENSE.txt
[product-screenshot]: public/assets/images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
[p5-url]: https://p5js.org/