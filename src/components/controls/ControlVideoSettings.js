import { useEffect, useState, useMemo } from 'react';

import ControlSlider from '@/components/controls/ControlSlider';
import getVideoFrames from '@/helpers/getVideoFrames';
import getDistributedSubarray from '@/helpers/getDistributedSubarray';

export default function ControlVideoSettings({
  setModalOpen,
  sourceVideo,
  setVideoUploadIsLoading,
  setSelectedFrame,
  setSourceImages,
  updateAsciiStrings,
  setAnimationFramerate
}) {
  const [frameCount, setFrameCount] = useState(null);
  const [uploadMessage, setUploadMessage] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoDuration, setVideoDuration] = useState(null);
  const [nativeFramerate, setNativeFramerate] = useState(null);
  const [frames, setFrames] = useState([]);
  const [animationFrameCount, setAnimationFrameCount] = useState(null);

  // load video and process frames
  useEffect(() => {
    async function processVideo() {
      // load file and create file url
      let videoBlob = await fetch(sourceVideo[0].data.src).then((r) => r.blob());
      let videoUrl = URL.createObjectURL(videoBlob);
      setVideoUrl(videoUrl);

      // get video duration
      let vid = document.createElement('video');
      vid.src = videoUrl; 
      vid.ondurationchange = function () { setVideoDuration(this.duration); }

      // revoke URL to prevent memory leak
      URL.revokeObjectURL(videoBlob);

      // update loading message
      setVideoUploadIsLoading(true);
      setUploadMessage("Loading frames...");

      // set up canvas
      let canvas = document.querySelector("#video-upload");
      let ctx = canvas.getContext("2d");

      // process video frames
      let frames = [];
      let i = -1;
      await getVideoFrames({
        videoUrl,
        onFrame(frame) {  // `frame` is a VideoFrame object: https://developer.mozilla.org/en-US/docs/Web/API/VideoFrame
          i++;
          if (i !== 0 && i % 5 !== 0) return;
          ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
          let image = document.createElement("img");
          image.width = canvas.width;
          image.height = canvas.height;
          image.src = canvas.toDataURL();
          frames.push({data: image});
          frame.close();
        },
        onConfig(config) {
          canvas.width = config.codedWidth / 2;
          canvas.height = config.codedHeight / 2;
        },
      });

      // update loading message to include frames
      let frameCount = i + 2;
      let nativeFramerate = Math.floor((frameCount) / vid.duration);
      setFrames(frames);
      setFrameCount(frameCount);
      setNativeFramerate(nativeFramerate);
      setAnimationFramerate(nativeFramerate / 2);
      setUploadMessage(`Loaded ${frameCount} frames...`);
      setAnimationFrameCount(Math.floor(frameCount / 4));
    }

    processVideo();
  }, []);

  // convert video frames into animation frames
  const createAnimationFrames = () => {
    // update global state
    let animationFrames = getDistributedSubarray(frames, animationFrameCount);
    setSelectedFrame(0);
    setSourceImages(animationFrames);
    updateAsciiStrings(draft => draft = new Array(animationFrames.length).fill("").map(str => str));
    setModalOpen(false);
  }
  
  return(
    <div className="flex flex-col gap-y-3 item-start justify-start border border-dashed border-[black] p-4 max-w-[350px] bg-white">
      <p>
        Source video: {sourceVideo[0].filename}
      </p>

      <canvas id="video-upload" className="max-w-[300px]" />

      {uploadMessage && (
        <p>
          {uploadMessage}
        </p>
      )}

      {videoDuration && (
        <p>
          Video duration: {videoDuration} seconds
        </p>
      )}

      {nativeFramerate && (
        <p>
          Native framerate: {nativeFramerate}
        </p>
      )}

      {frameCount && (
        <>
          <ControlSlider
            label="Number of animation frames"
            name="number-of-animation-frames"
            unit=" frames"
            min={1}
            max={frameCount}
            step={1}
            value={animationFrameCount}
            onChange={setAnimationFrameCount}
            className="!mt-0"
          />

          <p className="text-xs pl-2 -mt-3">
            The animation frame set is an evenly distributed subarray of the source video. For example, if you set an animation frame count of 100 for a source video of 400 frames, every fourth frame will be used in the animation. First and last frames are always included.
          </p>
        </>
      )}

      {frameCount && (
        <button onClick={createAnimationFrames}>
          Create animation frames and close
        </button> 
      )}
    </div>
  )
}