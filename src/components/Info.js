export default function Info() {
  return(
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%', height: 'calc(100vh - 100px)', fontSize: '0.85rem', maxWidth: 400 }}>
      <p>
        On the left-hand side you'll find a set of controls:
      </p>

      <ul>
        <li><strong>Source</strong> - Upload your source files. If you upload multiple image files they will be interpreted as video frames.</li>
        <li><strong>Filtering</strong> - Apply filters to your source image(s) before they're traced into ASCII sketches.</li>
        <li><strong>Tracing</strong> - Control various parameters that are taken into account during the tracing process.</li>
        <ul>
          <li><strong>Character density</strong> - Controls the number of characters per line of the ASCII sketch (in other words, the desired image width).</li>
          <li><strong>Should trace edges?</strong> - If toggled, image edges will be detected and outlined.</li>
          <li><strong>Edge character</strong> - The character to use for edge outlines.</li>
          <li><strong>Edge detection algorithm</strong> - The algorithm to use for edge detection (<a href="https://en.wikipedia.org/wiki/Sobel_operator" target="_blank">Sobel</a> is the only algorithm implemented at this time).</li>
          <li><strong>Edge detection threshold</strong> - Pixels whose gradient magnitude exceeds this value will be considered an edge pixel and traced with the edge character.</li>
          <li><strong>Shading ramp</strong> - The characters to be used while assigning source image pixels, from light to dark.</li>
        </ul>
        <li><strong>Writing</strong> - It's possible to manually edit the ASCII sketches by clicking on them and typing. These settings allow you to modify the manual editing experience.</li>
        <ul>
          <li><strong>Propagate changes to ASCII string</strong> - While writing to an ASCII sketch that's part of an animation, you may want your changes to one frame to spread to other frames. Use this setting to control how edits are propagated.</li>
        </ul>
      </ul>
    </div>
  );
}