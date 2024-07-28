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
          <li><strong>Video (WIP)</strong> - Upload a video that is split into a frame sequence based on the animation framerate setting (work in progress).</li>
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
          <li><strong>Character density</strong> - The number of characters per line in the ASCII string frames. In other words, the desired image width.</li>
          <li><strong>Should trace edges?</strong> - If true, an edge detection algorithm is applied during tracing.</li>
          <li><strong>Edge character</strong> - If tracing edges, this is the character used.</li>
          <li><strong>Edge detection algorithm</strong> - The only algorithm currently implemented is the <a href="https://en.wikipedia.org/wiki/Sobel_operator" target="_blank">Sobel</a> operator. Additional algorithms and parameter customizations are planned for V0.3.</li>
          <li><strong>Edge detection threshold</strong> - Pixels whose edge detection value surpasses this threshold will be assigned the specified edge character.</li>
          <li><strong>Shading ramp (dark to light)</strong> - Shading is currently based on perceived lightness (calculation details visible <a href="https://www.npmjs.com/package/trace-ascii-image?activeTab=code" target="_blank">here</a>). Shading algorithms and parameter customization will be expanded in V0.3. Earlier values in the array below correspond to low perceived lightness (dark pixels). Later values in the array correspond to high preceived lightness (bright pixels).</li>
        </ul>

        <h2>
          Writing
        </h2>
        <ul>
          <li><strong>Propagate changes to ASCII string</strong> - It's possible to manually edit characters in individual animation frames by clicking directly on the ASCII canvas. You may want edits to apply to more frames than just the one you're editing. In this case, use this setting to propagate changes.</li>
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
          <li><strong>Format</strong> - Select animation export format. Export format expansion is planned for V0.2.</li>
          <ul>
            <li><strong>embeddable animation (html/js)</strong> - Export code that can be embedded into another website. This consists of a frames.js file containing the animation's ASCII strings, a helper function fitTextToContainer.js to make the animation responsive, and an index.html file that renders and loops the animation.</li>
            <li><strong>png (selected frame)</strong> - Export a .png image of the selected frame.</li>
            <li><strong>png (frame sequence)</strong> - Export a .png image of the selected frame.</li>
          </ul>
          <li><strong>Export</strong> - Download animation in the selected format.</li>
        </ul>
      </div>
    </div>
  )
}