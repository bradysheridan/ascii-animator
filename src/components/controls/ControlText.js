export default function ControlText({
  label,
  name,
  value,
  limit,
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
        maxLength={limit || 524288}
        onChange={(e) => onChange(e.target.value)}
      />
    </nav>
  )
}