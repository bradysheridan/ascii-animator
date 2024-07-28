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

      {image && (
        <img
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          className="w-full h-full object-contain"
          src={image.data.src}
        />
      )}
    </div>
  )
}

export default function FrameTimeline() {
  const {
    asciiStrings,
    updateAsciiStrings,
    sourceImages,
    setSourceImages,
    selectedFrame,
    setSelectedFrame,
    animating,
    setAnimating
  } = useContext(ControlsContext);

  var sourceType = sourceImages.length === 0
    ? asciiStrings.length === 0
      ? null
      : "ascii strings"
    : "images";

  var sourceArr = [], renderFrame;

  // if only ascii strings are present but no images, render frames
  // without image previews (this happens when we load session data)
  if ("ascii strings" === sourceType) {
    sourceArr = asciiStrings;

    renderFrame = (str, i) => (
      <Frame
        key={`frame-${i}`}
        i={i}
        isSelected={i === selectedFrame}
        onSelect={() => {
          setAnimating(false);
          setSelectedFrame(i);
        }}
        onDelete={() => {
          var arr = [...asciiStrings];
          arr.splice(i, 1);
          updateAsciiStrings(arr);
          if (arr.length === 0) updateAsciiStrings([]);
        }}
      />
    );
  }

  // if images are present render frames with image previews
  if ("images" === sourceType) {
    sourceArr = sourceImages;

    renderFrame = (image, i) => (
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
          if (arr.length === 0) updateAsciiStrings([]);
          setSourceImages(arr);
        }}
      />
    );
  }

  return(
    <div className="frame-timeline-wrap">
      <div className="frame-timeline-controls">
        <h6>Frames</h6>

        { sourceArr.length <= 1
          ? null
          : <div className="frame-timeline-play-pause-toggle" onClick={() => setAnimating(!animating)}>
              { animating
                  ? <i className="ri-pause-circle-line ri-lg"></i>
                  : <i className="ri-play-circle-line ri-lg"></i>
              }
            </div>
        }
      </div>

      {sourceType && (
        sourceArr.map(renderFrame)
      )}
    </div>
  );
}