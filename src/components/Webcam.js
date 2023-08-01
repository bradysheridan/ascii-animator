import { useEffect, useRef, useState } from 'react'

// let but = document.getElementById("but");
// let video = document.getElementById("vid");
// let mediaDevices = navigator.mediaDevices;
// vid.muted = true;
// but.addEventListener("click", () => {


// });


export default function Webcam(props) {
  const {
    webcamEnabled
  } = props;

  useEffect(async () => {
    console.log("--> webcamEnabled", webcamEnabled);

    if (!webcamEnabled) return; // TODO: add condition: stream already created
    
    console.log
    var videoElement = document.getElementById("webcam-target");

    const stream = await navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream) => stream)
      .catch(alert);

      // ensure videoElement and stream objects both exist
      if (!videoElement || !stream)
        return;

      // apply size and framerate constraints to video stream
      // await stream.getVideoTracks()[0].applyConstraints({
      //   width: {exact: 640},
      //   height: {exact: 480},
      //   frameRate: {ideal: 10, max: 15}
      // });

      videoElement.srcObject = stream;
      videoElement.addEventListener("loadedmetadata", () => {
        videoElement.play();
      });
  }, [webcamEnabled]);

  return(
    <div>
      <p>
        Webcam {webcamEnabled.toString()}
      </p>

      <video
        id="webcam-target"
        style={{width: 300, height: 200, border: '1px solid red'}}
      ></video>


    </div>
  );
}