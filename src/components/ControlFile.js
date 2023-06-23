export default function ControlFile({
  label,
  name,
  multiple,
  value,
  onChange
}) {
  return(
    <nav className="control-file-wrap">
      <label htmlFor={name}>
        <p>{label}: {value.map((file, i) => `(${i+1}) ${file.name}${i < value.length - 1 ? ',' : ''}`).join(" ")}</p>
      </label>
      
      <input
        name={name}
        type="file"
        accept="image/png, image/jpg, image/jpeg"
        multiple={multiple}
        onChange={(e) => {
          if (e.target && e.target.files) {
            var files = [];
            
            for (const file of e.target.files) {
              files.push(file)
            }
            
            onChange(files);
          } else {
            throw "Couldn't process selected files."
          }
        }}
      />
    </nav>
  )
}