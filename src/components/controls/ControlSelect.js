export default function ControlSelect({
  label,
  name,
  values,
  onChange
}) {
  return(
    <nav className="control control-select">
      <label htmlFor={name}>
        <p>{label}</p>
      </label>
      
      <select
        name={name}
        onChange={(e) => onChange(e.target.value)}
      >
        {values.map((value, i) => (
          <option key={`value-${i}`} value={value}>{value}</option>
        ))}
      </select>
    </nav>
  )
}