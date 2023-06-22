import { useState } from 'react'

export default function ControlSlider({
  label,
  name,
  unit,
  min,
  max,
  step,
  value,
  onChange
}) {
  const [num, setNum] = useState(value ? value : 0);

  return(
    <nav className="control-slider-wrap">
      <label for={name}>
        {label}: {num}{unit}
      </label>
      
      <input
        name={name}
        type="range"
        min={min || 0}
        max={max || 100}
        step={step || 1}
        value={value}
        onChange={onChange}
      />
    </nav>
  )
}