export default function Demos() {
  return(
    <div className="flex mr-[24px]">
      <div className="lg:columns-2 lg:gap-x-4 lg:max-w-[800px] text-sm [&_*]:text-sm -mt-3 [&_h1]:mt-3 [&_h2]:mt-3 [&_h1]:mb-1 [&_h2]:mb-1 [&_h1]:text-[1.1em] [&_h2]:text-[1.1em]">
        <h1>About the ASCII Animator</h1>
        <p>
          This project was originally developed for a particular use-case: converting an image sequence into an array of ASCII strings that can be rendered as HTML elements and looped via Javascript to create a stop motion animation. The result is this website and the <a href="https://npmjs.com/package/trace-ascii-image" target="_blank">trace-ascii-image</a> npm module which are being developed in tandem.
        </p>

        <h2>
          Roadmap
        </h2>
        <p>
          It's early days for the ASCII Animator and trace-ascii-image. Check out the roadmap of planned updates below.
        </p>
        <ul>
          <li>V0.2</li>
          <ul className="mt-0">
            <li>Make significant UI improvements</li>
            <li>Add mobile functionality</li>
            <li>Expand import formats (video)</li>
            <li>Expand export formats (video, image sequence)</li>
            <li>Improve comments and documentation</li>
          </ul>

          <li>V0.3</li>
          <ul className="mt-0">
            <li>Make performance improvements</li>
            <li>Expand/improve shading and edge detection algorithms</li>
          </ul>

          <li>V0.4</li>
          <ul className="mt-0">
            <li>Expand/improve manual ASCII string editing experience</li>
          </ul>

          <li>V0.5</li>
          <ul className="mt-0">
            <li>Refactor to Next.js 14 and the app router (or potentially Astro)</li>
          </ul>

          <li>V??</li>
          <ul className="mt-0">
            <li>Add AI image generation to input methods</li>
          </ul>
        </ul>

        <h2 className="break-before-column">
          Similar tools
        </h2>
        <p>
          There are a bunch of tools out there for generating ASCII art from images; if this site doesn't quite fit your needs, you may find luck with one of these:
        </p>
        <ul>
          <li><a href="https://asciiflow.com/" target="_blank">asciiflow</a> - Draw ASCII sketches and diagrams from scratch</li>
          <li><a href="https://www.asciiart.eu/trace-ascii-image" target="_blank">ASCII Art Archive</a> - Convert a single image to ASCII art</li>
          <li><a href="https://patorjk.com/software/taag/#p=display&f=Graffiti&t=Type%20Something%20" target="_blank">Text to ASCII Art Generator (TAAG)</a> - Convert text to ASCII bubble letters</li>
        </ul>

        <h2>Open-source contributions</h2>
        <p>
          This project is open-source. Check out the <a href="https://github.com/bradysheridan/ascii-animator" target="_blank">Github repo</a> to see the code, make a pull request or report an issue.
        </p>

        <h2>Contact</h2>
        <div className="flex flex-wrap gap-x-1 text-xs">
          <p>Reach out at</p>
          
          <p>
            [dev@bradysheridan.com]
          </p>

          <a href="https://www.bradysheridan.com/" target="_blank">
            [bradysheridan.com]
          </a>

          <a href="https://github.com/bradysheridan" target="_blank">
            [github.com/bradysheridan]
          </a>

          <a href="https://www.instagram.com/brsheridan/" target="_blank">
            [@brsheridan]
          </a>

          <p>to say hello!</p>
        </div>

        <p>
          Please consider <a href="https://buymeacoffee.com/devq" target="_blank">buying me a cup of joe</a> if you've found this tool useful in a commercial or professional capacity <span className="text-[red]">{"<3"}</span>
        </p>

        <h2>Demos</h2>
        <p>
          If you've used the ASCII Animator to make something cool, shoot me an email to have it listed here!
        </p>
        <ul>
          <li><a href="https://www.likeafield.com/" target="_blank">likeafield.com</a> - ASCII landscape as a background element</li>
        </ul>
      </div>
    </div>
  )
}