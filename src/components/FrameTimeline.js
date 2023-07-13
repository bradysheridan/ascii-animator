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
    setSelectedFrame,
    animating,
    setAnimating
  } = useContext(ControlsContext);

  return(
    <div className="frame-timeline-wrap">
      <div className="frame-timeline-controls">
        <h6>Frames</h6>

        { sourceImages.length <= 1
          ? null
          : <div className="frame-timeline-play-pause-toggle" onClick={() => setAnimating(!animating)}>
              { animating
                  ? <i class="ri-pause-circle-line ri-lg"></i>
                  : <i class="ri-play-circle-line ri-lg"></i>
              }
            </div>
        }
      </div>

      {
        sourceImages.map((image, i) => (
          <Frame
            key={`frame-${i}`}
            i={i}
            image={image}
            isSelected={i === selectedFrame}
            onClick={() => {
              setAnimating(false);
              setSelectedFrame(i);
            }}
          />
        ))
      }
    </div>
  )
}