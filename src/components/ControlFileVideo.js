import getVideoFrames from '@/helpers/initializeGetVideoFrames';

export default function ControlFileVideo({
  label,
  name,
  accept,
  multiple,
  value,
  onChange
}) {
  return(
    <nav className="control control-file-wrap">
      <label htmlFor={name}>
        <p>{label}: {value ? value.filename : ""}</p>
      </label>
      
      <input
        name={name}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => {
          if (!e.target.files || e.target.files.length < 1) return;
          var file = e.target.files[0];
          getVideoFrames(file, (frames) => {
            console.log("frames2", frames);
            onChange(frames,);
          });
        }}
      />
    </nav>
  )
}