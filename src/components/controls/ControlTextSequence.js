

export default function ControlText({
  label,
  name,
  value,
  onChange,
  delimiter
}) {


  return(
    <nav className="control control-text-wrap">
      <label htmlFor={name}>
        <p>{label}</p>
      </label>
      
      {value.split(delimiter).map((val, i) => (
        <div className="">
          <input
            key={`val-${i}`}
            type="text"
            defaultValue={val}
          />
        </div>
      ))}
    </nav>
  )
}