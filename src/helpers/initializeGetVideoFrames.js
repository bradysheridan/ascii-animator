import getVideoFrames from "@/helpers/getVideoFrames";

var frames = [];

const base64_arraybuffer = async (data) => {
  // Use a FileReader to generate a base64 data URI
  const base64url = await new Promise((r) => {
      const reader = new FileReader()
      reader.onload = () => r(reader.result)
      reader.readAsDataURL(new Blob([data]))
  })

  /*
  The result looks like 
  "data:application/octet-stream;base64,<your base64 data>", 
  so we split off the beginning:
  */
  return base64url.substring(base64url.indexOf(',')+1)
}

// wrapper function
export default async function initializeGetVideoFrames(file, callback) {
  console.log("Called initializeGetVideoFrames...");

  // `getVideoFrames` requires a video URL as input
  // if you have a file/blob instead of a videoUrl,
  // turn it into a URL like this:
  let videoUrl = URL.createObjectURL(file),
      frames = [];

  console.log("> file", file);
  console.log("> videoUrl", videoUrl);

  const res = await getVideoFrames({
    videoUrl,
    async onFrame(frame, i) {
      // console.log("> frame", frame);
      // frames.push(frame);
      // ctx.drawImage(frame, 0, 0, canvasEl.width, canvasEl.height);

      // convert frame to typed array
      let buffer = new Uint8Array(frame.allocationSize());
      let data = await frame.copyTo(buffer);

      // create data object url from typed array
      // let objectUrl = URL.createObjectURL(new Blob([data.buffer], { type: 'image/png' }));
      let b64 = "data:image/png;base64," + await base64_arraybuffer(buffer);
      // console.log("> b64", b64);

      // create image from data url
      var img = new Image(300, 300);
      img.src = b64;

      // push image to frames array
      frames.push({
        data: img,
        filename: "blah"
      });

      // document.getElementById('my-img').src = URL.createObjectURL(
      //   new Blob([content.buffer], { type: 'image/png' } /* (1) */)
      // );

      // close frame to prevent memory leak
      frame.close();
    },
    onConfig(config) {
      // canvasEl.width = config.codedWidth;
      // canvasEl.height = config.codedHeight;
    },
    onFinish() {
      console.log("> finished!");
      console.log("> frames", frames);
      callback(frames);
    },
  });

  // URL.revokeObjectURL(file); // revoke URL to prevent memory leak
}