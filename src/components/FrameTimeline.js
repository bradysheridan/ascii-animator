import { useContext } from 'react'
import { ControlsContext } from '@/components/ControlsContext';

function Frame({
  i,
  image,
  isSelected,
  onClick
}) {
  return(
    <div className={["frame-preview", isSelected ? "selected" : ""].join(" ")} onClick={onClick}>
      <p className="frame-number">
        { i + 1 }
      </p>

      <img
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        src={image.data.src}
      />
    </div>
  )
}

export default function FrameTimeline() {
  const {
    sourceImages,
    selectedFrame,
    setSelectedFrame
  } = useContext(ControlsContext);

  return(
    <div className="frame-timeline-wrap">
      {
        sourceImages.map((image, i) => (
          <Frame
            key={`frame-${i}`}
            i={i}
            image={image}
            isSelected={i === selectedFrame}
            onClick={() => setSelectedFrame(i)}
          />
        ))
      }
    </div>
  )
}