export default function ControlFileSession({
  label,
  name,
  onChange
}) {
  return(
    <nav className="control control-session-wrap">
      <label htmlFor={name}>
        <p>{label}</p>
      </label>
      
      <input
        name={name}
        type="file"
        accept="application/json,.ascii"
        onChange={(e) => {
          var reader = new FileReader();
          reader.onload = (e) => onChange(JSON.parse(e.target.result));
          reader.readAsText(e.target.files[0]);
        }}
      />
    </nav>
  )
}