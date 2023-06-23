import { useContext } from 'react'
import { ControlsContext } from '@/components/ControlsContext';

const frames = [
  1,
  2,
  3,
  4
]

function Frame({
  i,
  frame
}) {
  return(
    <div className="frame">
      <p className="frame-number">
        { i + 1 }
      </p>
    </div>
  )
}

export default function FrameTimeline() {
  const {
    
  } = useContext(ControlsContext);

  return(
    <div className="frame-timeline-wrap">
      {
        frames.map((frame, i) => (
          <Frame
            key={`frame-${i}`}
            i={i}
            frame={frame}
          />
        ))
      }
    </div>
  )
}