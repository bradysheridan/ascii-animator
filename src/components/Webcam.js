import { useEffect, useRef, useState } from 'react'

// let but = document.getElementById("but");
// let video = document.getElementById("vid");
// let mediaDevices = navigator.mediaDevices;
// vid.muted = true;
// but.addEventListener("click", () => {


// });


export default function Webcam(props) {
  const {
    webcamEnabled,
    onFrame
  } = props;

  const enableWebcam = async () => {
    const videoElement = document.getElementById("webcam-target");
    const canvasElement = document.getElementById("webcam-preview");

    const stream = await navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream) => stream)
      .catch(alert);

      // ensure videoElement and stream objects both exist
      if (videoElement && stream) {
        // apply size and framerate constraints to video stream
        await stream.getVideoTracks()[0].applyConstraints({
          width: {exact: 640},
          height: {exact: 480},
          frameRate: {ideal: 10, max: 15}
        });
        
        videoElement.srcObject = stream;
        videoElement.addEventListener("loadedmetadata", () => {
          videoElement.play();
        });

        // update asciistring every half second
        setInterval(() => {
          canvasElement.getContext('2d').drawImage(videoElement, 0, 0, 640, 480);
          onFrame({ data: {src: canvasElement.toDataURL()} });
        }, 2000);
      }
  };

  const disableWebcam = () => {
    // const videoElement = document.getElementById("webcam-target");
    // videoElement.srcObject = stream;
    // videoElement.addEventListener("loadedmetadata", () => {
    //   videoElement.play();
    // });
  }

  useEffect(() => {
    if (webcamEnabled) {
      enableWebcam();
    } else {
      disableWebcam();
    }
  }, [webcamEnabled]);

  return(
    <div>
      <p>Webcam {webcamEnabled.toString()}</p>
      <video id="webcam-target" style={{width: 300, height: 200, border: '1px solid red'}}></video>
      <canvas id="webcam-preview"></canvas>
    </div>
  );
}