export default function createEmbeddableSnippet(animationFramerate) {
  return`
<!DOCTYPE html>
<html>
<head>
  <title>ASCII Animator - Embeddable animation - ${Date.now()}</title>
  <script src="./frames.js"></script>
  <script src="./fitTextToContainer.js"></script>
</head>
<body>
  <pre id="trace" style="width: 100%; max-width: 600px; font-family: monospace; border: 1px dashed black; margin: 0;">
    <span id="trace-chars"></span>
  </pre>

  <script>
    var pre = document.getElementById('trace');
    var i = -1;
    var dir = 'inc';
    var max = frames.length
    var fps = ${animationFramerate};

    setPreCharSize();
    startAnimating();

    window.addEventListener('resize', setPreCharSize);

    function setPreCharSize() {
      var charRatio = 0.66;
      var charWidth = fitTextToContainer(frames[0].split('\\n')[1], 'monospace', pre.clientWidth) * charRatio;
      var charHeight = charRatio * charWidth;
      pre.style.fontSize = charWidth + "px";
      pre.style.lineHeight = charHeight + "px";
    }

    // initialize the timer variables and start the animation
    var fpsInterval, startTime, now, then, elapsed;
    function startAnimating() {
      fpsInterval = 1000 / fps;
      then = Date.now();
      startTime = then;
      animate();
    }

    // the animation loop calculates time elapsed since the last loop
    // and only draws if your specified fps interval is achieved
    function animate() {
      // request another frame
      requestAnimationFrame(animate);

      // calc elapsed time since last loop
      now = Date.now();
      elapsed = now - then;

      // if enough time has elapsed, draw the next frame
      if (elapsed > fpsInterval) {
        // get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        then = now - (elapsed % fpsInterval);

        // step
        step();
      }
    }

    function step() {
      if (dir === 'inc') {
        if (i === max - 1) {
          dir = 'dec';
          i--;
        } else {
          i++;
        }
      } else if (dir === 'dec') {
        if (i === 0) {
          dir = 'inc';
          i++
        } else {
          i--;
        }
      }

      document.getElementById('trace-chars').innerText = frames[i];
    }

    function fitTextToContainer(text, fontFace, containerWidth) {
      const PIXEL_RATIO = getPixelRatio();

      // --- debug logs ----------------------------------------------
      // console.log("Invoked fitTextToContainer...");
      // console.log("> text", text);
      // console.log("> fontFace", fontFace);
      // console.log("> containerWidth", containerWidth);
      // console.log("> PIXEL_RATIO", PIXEL_RATIO);

      let canvas = createHiDPICanvas(containerWidth, 0),
          context = canvas.getContext('2d'),
          longestLine = getLongestLine(split(text)),
          fittedFontSize = getFittedFontSize(longestLine, fontFace);

      return fittedFontSize;

      // --- helpers -------------------------------------------------

      // calculate pixel ratio, which we'll use to to ensure
      // accurate measurement corresponding to screen resolution
      // (https://bit.ly/34sGn9D)
      function getPixelRatio() {
        let ctx = document.createElement("canvas").getContext("2d"),
            dpr = window.devicePixelRatio || 1,
            bsr = ctx.webkitBackingStorePixelRatio ||
                  ctx.mozBackingStorePixelRatio ||
                  ctx.msBackingStorePixelRatio ||
                  ctx.oBackingStorePixelRatio ||
                  ctx.backingStorePixelRatio || 1

        return dpr / bsr
      }

      // split text into lines
      function split(text) {
        return text.split('\\n')
      }

      function getLongestLine(lines) {
        let longest = -1, i

        lines.forEach((line, ii) => {
          let lineWidth = context.measureText(line).width

          if (lineWidth > longest) {
            i = ii
            if (!line.includes('exempt-from-text-fit-calculation')) {
              longest = lineWidth
            }
          }
        })

        return ('number' === typeof i) ? lines[i] : null
      }

      // calculate maximum font size for given text and canvas context
      function getFittedFontSize(text, fontFace) {
        const fits = () => context.measureText(text).width <= canvas.width
        const font = (size, face) => size + "px " + face

        // start with a large font size
        let fontSize = 300

        // lower the font size until the text fits the canvas
        do {
          fontSize--
          context.font = font(fontSize, fontFace)
        } while(!fits())

        // draw the text (used in demo)
        // context.fillText(text, 0, 0)

        // adjust for resolution
        fontSize /= (PIXEL_RATIO / 1.62)

        return fontSize
      }

      // create canvas element to be used for measurement
      // (PIXEL_RATIO helps us account for all screen resolutions)
      function createHiDPICanvas(w, h) {
        let canvas = document.createElement("canvas")
        canvas.width = w * PIXEL_RATIO
        canvas.height = h * PIXEL_RATIO
        canvas.style.width = w + "px"
        canvas.style.height = h + "px"
        canvas.getContext("2d").setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0)
        return canvas
      }
    }
  </script>
</body>
</html>`
}