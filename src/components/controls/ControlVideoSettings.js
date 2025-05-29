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
  const [currentProcessingFrame, setCurrentProcessingFrame] = useState(null);

  useEffect(() => {
    async function processVideo() {
      let videoBlob = await fetch(sourceVideo[0].data.src).then((r) => r.blob());
      let videoUrl = URL.createObjectURL(videoBlob);
      setVideoUrl(videoUrl);

      let vid = document.createElement('video');
      vid.src = videoUrl;
      vid.ondurationchange = function () { setVideoDuration(this.duration); }

      URL.revokeObjectURL(videoBlob);

      setVideoUploadIsLoading(true);
      setUploadMessage("Loading frames...");

      let frames = [];
      let i = -1;
      let processedFrameCount = 0;
      let canvasWidth = 0;
      let canvasHeight = 0;

      await getVideoFrames({
        videoUrl,
        onFrame(frame) {
          i++;
          if (i !== 0 && i % 5 !== 0) {
            frame.close();
            return;
          }

          let canvas = document.createElement('canvas');
          let ctx = canvas.getContext("2d");

          canvas.width = canvasWidth;
          canvas.height = canvasHeight;

          processedFrameCount++;
          setUploadMessage(`Processing frame ${processedFrameCount}...`);

          ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
          let image = document.createElement("img");
          image.width = canvas.width;
          image.height = canvas.height;
          image.src = canvas.toDataURL();

          setCurrentProcessingFrame(image.src);

          frames.push({ data: image });
          frame.close();
        },
        onConfig(config) {
          canvasWidth = config.codedWidth / 2;
          canvasHeight = config.codedHeight / 2;
        },
      });

      let frameCount = i + 1;
      let nativeFramerate = Math.floor((frameCount) / vid.duration);
      setFrames(frames);
      setFrameCount(frameCount);
      setNativeFramerate(nativeFramerate);
      setAnimationFramerate(nativeFramerate / 2);
      setUploadMessage(`Loaded ${frames.length} frames from ${frameCount} total frames...`);
      setAnimationFrameCount(Math.floor(frames.length / 4));
      setVideoUploadIsLoading(false);
    }

    processVideo();
  }, []);

  const createAnimationFrames = () => {
    let animationFrames = getDistributedSubarray(frames, animationFrameCount);
    setSelectedFrame(0);
    setSourceImages(animationFrames);
    updateAsciiStrings(draft => draft = new Array(animationFrames.length).fill("").map(str => str));
    setModalOpen(false);
  }

  return (
    <div className="flex flex-col gap-y-3 item-start justify-start border border-dashed border-[black] p-4 max-w-[350px] bg-white">
      <p>
        Source video: {sourceVideo[0].filename}
      </p>

      {(currentProcessingFrame || (frames.length > 0 && frames[0]?.data?.src)) && (
        <img
          src={currentProcessingFrame || frames[0].data.src}
          className="max-w-[300px]"
          alt="Video frame preview"
        />
      )}

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
            max={frames.length || frameCount}
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

      {frames.length > 0 && (
        <button onClick={createAnimationFrames}>
          Create animation frames and close
        </button>
      )}
    </div>
  )
}