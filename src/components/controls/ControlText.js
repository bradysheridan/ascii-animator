export default function ControlText({
  label,
  name,
  value,
  onChange
}) {
  return(
    <nav className="control control-text-wrap">
      <label htmlFor={name}>
        <p>{label}</p>
      </label>
      
      <input
        name={name}
        type="text"
        defaultValue={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </nav>
  )
}