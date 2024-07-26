export default function ControlSelect({
  label,
  name,
  value,
  onChange
}) {
  return(
    <nav className="control control-toggle">
      <label htmlFor={name}>
        <p>{label}</p>
      </label>
      
      <input
        type="checkbox"
        name={name}
        defaultChecked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
    </nav>
  )
}