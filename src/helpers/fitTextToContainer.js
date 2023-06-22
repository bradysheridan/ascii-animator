// https://observablehq.com/d/66fda698f8b2e164
function fitTextToContainer(text, fontFace, containerEl, initialFontSize) {
  const PIXEL_RATIO = getPixelRatio(),
        width = containerEl.getBoundingClientRect().width

  if (!initialFontSize) initialFontSize = parseFloat(containerEl.style['font-size'])

  let canvas = createHiDPICanvas(width, 0),
      context = canvas.getContext('2d'),
      longestLine = getLongestLine(split(text)),
      fittedFontSize = getFittedFontSize(longestLine, fontFace)

  return fittedFontSize

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
    return text.split('\n')
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
    const font = (size, face) => `${size}px ${face}`

    // start with a large font size
    let fontSize = 300

    // lower the font size until the text fits the canvas
    do {
      fontSize--
      context.font = font(fontSize, fontFace)
    } while(!fits())

    // draw the text (only for this demo)
    context.fillText(text, 0, 0)

    // adjust for resolution
    fontSize /= PIXEL_RATIO

    return fontSize
  }

  // create canvas element to be used for measurement
  // (PIXEL_RATIO helps us account for all screen resolutions)
  function createHiDPICanvas(w, h) {
    let canvas = document.createElement("canvas")
    canvas.width = w * PIXEL_RATIO
    canvas.height = h * PIXEL_RATIO
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    canvas.style.border = '1px dashed green'
    canvas.getContext("2d").setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0)
    return canvas
  }
}