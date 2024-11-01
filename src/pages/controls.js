export default function Controls() {
  return(
    <div className="flex mr-[24px]">
      <div className="lg:max-w-[600px] text-sm [&_*]:text-sm -mt-3 [&_h1]:mt-3 [&_h2]:mt-3 [&_h1]:mb-1 [&_h2]:mb-1 [&_h1]:text-[1.1em] [&_h2]:text-[1.1em]">
        <h1>Controls</h1>
        <h2>
          Input
        </h2>
        <ul>
          <li><strong>Image(s)</strong> - Upload a frame sequence (png, jpg, jpeg) to be animated. Video upload is still in development; you can use <a href="https://ezgif.com/video-to-jpg" target="_blank">this tool</a> to split your video into frames then upload the resulting image sequence.</li>
          <li><strong>Video</strong> - Upload a video (mp4, mov) that is split into a frame sequence based on the animation frame count setting.</li>
          <li><strong>Webcam mode</strong> - Stream your webcam's video feed into the ASCII Animator. Use the "Start recording" and "Take picture" buttons to save video frames or individual photos to the animation frame timeline.</li>
          <li><strong>Load saved session</strong> - Upload saved data from the "Save working session" button in the Output section. ASCII string frames are stored in the saved data but source images are not.</li>
        </ul>

        <h2>
          Filtering
        </h2>
        <ul>
          <li><strong>Filter</strong> - Select a filter to apply to source images before tracing them into ASCII sketches. These filters are documented <a href="https://p5js.org/reference/p5/filter/" target="_blank">here</a>.</li>
        </ul>

        <h2>
          Tracing
        </h2>
        <ul>
          <li><strong>Character density</strong> - The desired number of characters per line (in other words, the desired image width).</li>
          <li><strong>Should trace edges?</strong> - If true, an edge detection algorithm is applied during tracing.</li>
          <li><strong>Edge character</strong> - If tracing edges, this is the character used.</li>
          <li><strong>Edge detection algorithm</strong> - The only algorithm currently implemented is the <a href="https://en.wikipedia.org/wiki/Sobel_operator" target="_blank">Sobel</a> operator. Additional algorithms and parameter customizations are planned for v0.3.</li>
          <li><strong>Edge detection threshold</strong> - Pixels whose gradient magnitude surpasses this threshold are assigned the specified edge character. Gradient magnitude measures how much a pixel differs from the ones around it and results in a value between 1 and 355.</li>
          <li><strong>Shading ramp (dark to light)</strong> - The array of characters used when assigning source image pixels their text equivalents. This calculation is based on a pixel's perceived lightness and results in a value between 0 and 100. That value is then linearly remapped to the length of the shading ramp array and used to access the corresponding character. Shading algorithms and parameter customization will be expanded in v0.3.</li>
        </ul>

        <h2>
          Writing
        </h2>
        <ul>
          <li><strong>Propagate changes to ASCII string</strong> - It's possible to manually edit characters in individual animation frames by clicking directly on the ASCII canvas and typing. You may want edits to apply to more frames than just the one you're editing. In this case, use this setting to propagate changes. Note that while editing a given frame, a small edit icon will appear next to the frame number; wait for this icon to disappear before switching to another frame to ensure your changes are saved.</li>
        </ul>

        <h2>
          Animation
        </h2>
        <ul>
          <li><strong>Animation framerate</strong> - The framerate used while playing the animation preview and exporting the animation.</li>
        </ul>

        <h2>
          Output
        </h2>
        <ul>
          <li><strong>Save working session</strong> - Export your working session, including all ASCII frames and settings. Source images are not included in save data.</li>
          <li><strong>Format</strong> - Select animation export format. Export format expansion is planned for v0.2.</li>
          <ul>
            <li><strong>embeddable animation (html/js)</strong> - Export code that can be embedded into another website. This consists of a frames.js file containing the animation's ASCII strings, a helper function fitTextToContainer.js to make the animation responsive, and an index.html file that renders and loops the animation.</li>
            <li><strong>png (selected frame)</strong> - Export a .png image of the selected frame.</li>
          </ul>
          <li><strong>Export</strong> - Download animation in the selected format.</li>
        </ul>
      </div>
    </div>
  )
}