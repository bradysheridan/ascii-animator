var width = 200;
var height = 200;

export default function CanvasSource(props) {
  const { title } = props;

  return(
    <div className="canvas canvas-ascii">
      <p className="canvas-title">
        {title}
      </p>
      
      <div style={{ width, height, background: '#eee' }}>
        <p>
          {"-> Will render ASCII sketch here."}
        </p>
      </div>
    </div>
  )
}