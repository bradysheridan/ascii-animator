import { useEffect, useRef, useState } from 'react'
import ControlButton from '@/components/ControlButton'

export default function ControlWebcam(props) {
  const {
    webcamEnabled,
    webcamRecording,
    animationFramerate,
    setWebcamEnabled,
    setWebcamRecording,
    setSourceVideoStream,
    recordFrame
  } = props;

  // expose alias 'my' to store local non-state vars within component instance
  const componentRef = useRef({});
  const { current: my } = componentRef;

  const getFrameImage = () => {
    if (!my.canvasElement) return;
    return { data: { src: my.canvasElement.toDataURL(), width: my.canvasElement.width, height: my.canvasElement.height }};
  }

  // get video stream from webcam and store video frames in global state at the specified framerate
  const enableWebcam = async () => {
    // initialize video and canvas elements
    my.videoElement = document.createElement("video");
    my.canvasElement = document.createElement("canvas");
    my.canvasElement.width = 640;
    my.canvasElement.height= 480;
    my.context = my.canvasElement.getContext("2d");
    my.context.translate(my.canvasElement.width, 0)
    my.context.scale(-1, 1)
    // my.context.drawImage(image, 0, 0, width, height)

    // initialize animation vars
    var fps = animationFramerate,
        fpsInterval,
        startTime,
        now,
        then,
        elapsed;

    // start animation
    const animateOnStart = () => {
      fpsInterval = 1000 / fps;
      then = Date.now();
      startTime = then;
      animateOnFrame();
    };

    // animation frame
    const animateOnFrame = () => {
      // request another frame
      my.animationFrameRequestId = requestAnimationFrame(animateOnFrame);

      // calc elapsed time since last loop
      now = Date.now();
      elapsed = now - then;
  
      // if enough time has elapsed, draw the next frame
      if (elapsed > fpsInterval) {
        // get ready for next frame by setting then=now
        // adjust for fpsInterval not being a multiple of RAF's interval (16.7ms)
        then = now - (elapsed % fpsInterval);

        // draw image
        my.canvasElement.getContext('2d').drawImage(my.videoElement, 0, 0, my.canvasElement.width, my.canvasElement.height);

        // overwrite single frame image in video stream state var
        var frameImage = getFrameImage();
        setSourceVideoStream([frameImage]);

        // if recording, record this frame
        if (my.webcamRecording) {
          if (!my.webcamRecordingFrameIndex) my.webcamRecordingFrameIndex = 0;
          recordFrame({ filename: `webcam${my.webcamRecordingFrameIndex}`, ...frameImage });
          my.webcamRecordingFrameIndex++;
        }
      }
    };

    // create video stream
    const stream = await navigator.mediaDevices
      .getUserMedia({ video: true, audio: false, })
      .then((stream) => stream)
      .catch(alert);

    if (my.videoElement && stream) {
      // apply size and framerate constraints to video stream
      // TODO: update framerate handler
      await stream.getVideoTracks()[0].applyConstraints({
        width: my.canvasElement.width,
        height: my.canvasElement.height,
        frameRate: 10
      });
      
      // set webcam stream as video element data source
      my.videoElement.srcObject = stream;

      // play video and start animation
      my.videoElement.addEventListener("loadedmetadata", () => {
        my.videoElement.play();
        animateOnStart();
      });
    }
  };

  // stop video stream
  const disableWebcam = () => {
    cancelAnimationFrame(my.animationFrameRequestId);
  }

  // start/stop video stream based on webcamEnabled prop
  useEffect(() => {
    if (webcamEnabled) {
      enableWebcam();
    } else {
      disableWebcam();
    }
  }, [webcamEnabled]);

  useEffect(() => { my.webcamRecording = webcamRecording }, [webcamRecording]);

  return(
    <>
      <ControlButton
        label={"Webcam mode"}
        value={webcamEnabled ? "Turn off" : "Turn on"}
        onClick={() => setWebcamEnabled(!webcamEnabled)}
      />

      {webcamEnabled && (
        <div style={{display: 'flex', marginTop: 5}}>
          <ControlButton
            noMargin
            value={webcamRecording ? "Stop recording" : "Start recording"}
            onClick={() => setWebcamRecording(!webcamRecording)}
          />

          <span style={{width: 5}}></span>
          
          <ControlButton
            noMargin
            disabled={webcamRecording}
            value={"Take picture"}
            onClick={() => recordFrame(getFrameImage())}
          />
        </div>
      )}      
    </>
  );
}
