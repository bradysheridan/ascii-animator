import { useState } from 'react'

export default function ControlSlider({
  label,
  name,
  value
}) {
  const [num, setNum] = useState(value ? value : 0);

  return(
    <nav className="control-file-upload">
      <label for={name}>
        {label}
      </label>
      
      <input
        name={name}
        multiple={multiple}
        type="file"
        accept="image/png, image/jpg, image/jpeg"
      />
    </nav>
  )
}