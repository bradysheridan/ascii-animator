export default function ControlSlider({
  label,
  name,
  unit,
  min,
  max,
  step,
  value,
  onChange,
  className
}) {
  return(
    <nav className={`control control-slider-wrap ${className || ""}`}>
      <label htmlFor={name}>
        <p>{label}: {value}{unit}</p>
      </label>
      
      <input
        name={name}
        type="range"
        min={min || 0}
        max={max || 100}
        step={step || 1}
        defaultValue={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </nav>
  )
}