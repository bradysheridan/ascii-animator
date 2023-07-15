export default function ControlFileImage({
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
        <p>{label}: {value.map((file, i) => `(${i+1}) ${file.filename}${i < value.length - 1 ? ',' : ''}`).join(" ")}</p>
      </label>
      
      <input
        name={name}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => {
          processImagesFromFiles(e.target.files, [], 0, (processedImages) => {
            onChange(processedImages);
          });

          function processImagesFromFiles(src, dest, i, cb) {
            // start condition
            if (i === 0) {
              dest = [];
            }

            // end condition
            if (i === src.length) {
              cb(dest);
              return dest;
            }

            var filename = src[i].name;
            var reader = new FileReader();

            reader.onload = (e) => {
              var img = new Image(300, 300);
              img.src = e.target.result;

              dest.push({
                data: img,
                filename: filename
              });

              i++;

              return processImagesFromFiles(src, dest, i, cb);
            }

            reader.readAsDataURL(src[i]);
          }
        }}
      />
    </nav>
  )
}