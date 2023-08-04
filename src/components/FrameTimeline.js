import { useContext } from 'react'
import { ControlsContext } from '@/components/ControlsContext';

function Frame({
  i,
  image,
  isSelected,
  onSelect,
  onDelete
}) {
  return(
    <div className={["frame-preview", isSelected ? "selected" : ""].join(" ")} onClick={onSelect}>
      <p className="frame-number">
        { i + 1 }
      </p>

      <p className="delete-frame" onClick={onDelete}>
        <i className="ri-delete-bin-2-line"></i>
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
    setSourceImages,
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
                  ? <i className="ri-pause-circle-line ri-lg"></i>
                  : <i className="ri-play-circle-line ri-lg"></i>
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
            onSelect={() => {
              setAnimating(false);
              setSelectedFrame(i);
            }}
            onDelete={() => {
              var arr = [...sourceImages];
              arr.splice(i, 1);
              setSourceImages(arr);
            }}
          />
        ))
      }
    </div>
  );
}