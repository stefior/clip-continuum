"use strict";

const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioContext;
let userAudio;
const recordingModeButtons = document.querySelectorAll(".mode-button");
const playButton = document.querySelector("#start-button");
const pauseResumeButton = document.querySelector("#pause-resume-button");
const endButton = document.querySelector("#end-button");
const recordingsList = document.querySelector("#recordings-list");

recordingModeButtons.forEach((recordingModeButton) => {
  recordingModeButton.addEventListener(
    "click",
    () => {
      // necessary to initialize user audio after a user interaction due to how the browser handles autoplay stuff
      audioContext = new AudioContext();
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          userAudio = new MediaRecorder(stream);
          userAudio.addEventListener("dataavailable", (event) => {
            const audio = document.createElement("audio");
            audio.controls = true;
            const blob = new Blob([event.data], {
              type: "audio/ogg; codecs=opus",
            });
            const audioURL = window.URL.createObjectURL(blob);
            audio.src = audioURL;
            recordingsList.appendChild(audio);
          });
        })
        .catch((err) => {
          console.error("Failed to get media", err);
        });
    },
    { once: true }
  );
});

let timer = 0;
let timerInterval;
const timerNode = document.querySelector("#timer");
const recordingIndicator = document.querySelector("#recording-indicator");
playButton.addEventListener("click", () => {
  if (!userAudio) {
    console.error("MediaRecorder not initialized");
    return;
  }

  function startRecording() {
    userAudio.start();
    playButton.dataset.playing = "true";
    timerInterval = setInterval(() => {
      timer += 1;
      let minutes = Math.floor(timer / 6000);
      let seconds = Math.floor((timer % 6000) / 100);
      timerNode.textContent = `${minutes}:${
        seconds < 10 ? "0" + seconds : seconds
      }`;
    }, 10);
    recordingIndicator.removeAttribute("hidden");
  }

  if (playButton.dataset.playing === "false") {
    startRecording();
  } else {
    userAudio.stop();
    playButton.dataset.playing = "false";
    timer = 0;
    clearInterval(timerInterval);
    recordingIndicator.setAttribute("hidden", "");

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      userAudio = new MediaRecorder(stream);
      startRecording();
      userAudio.addEventListener("dataavailable", (event) => {
        const audio = document.createElement("audio");
        audio.controls = true;
        const blob = new Blob([event.data], {
          type: "audio/ogg; codecs=opus",
        });
        const audioURL = window.URL.createObjectURL(blob);
        audio.src = audioURL;
        recordingsList.appendChild(audio);
      });
    });
  }
});

pauseResumeButton.addEventListener("click", () => {
  if (!userAudio) {
    console.error("MediaRecorder not initialized");
    return;
  }

  if (userAudio.state === "recording") {
    userAudio.pause();
    playButton.dataset.playing === "false";
    clearInterval(timerInterval);
    recordingIndicator.setAttribute("hidden", "");
  } else if (userAudio.state === "paused") {
    userAudio.resume();
    playButton.dataset.playing = "true";
    timerInterval = setInterval(() => {
      timer += 1;
      let minutes = Math.floor(timer / 6000);
      let seconds = Math.floor((timer % 6000) / 100);
      timerNode.textContent = `${minutes}:${
        seconds < 10 ? "0" + seconds : seconds
      }`;
    }, 10);
    recordingIndicator.removeAttribute("hidden");
  }
});

endButton.addEventListener("click", () => {
  if (!userAudio) {
    console.error("MediaRecorder not initialized");
    return;
  }

  if (userAudio.state === "recording" || userAudio.state === "paused") {
    userAudio.stop();
    playButton.dataset.playing = "false";
    timer = 0;
    clearInterval(timerInterval);
    recordingIndicator.setAttribute("hidden", "");
  }
});

let selectedMode = null;
const modeButtons = document.querySelectorAll(".mode-button");
modeButtons.forEach((modeButton) =>
  modeButton.addEventListener("click", () => {
    if (!selectedMode) {
      modeButton.classList.toggle("bg-red-500");
      modeButton.classList.toggle("hover:bg-red-600");
      modeButton.classList.toggle("bg-blue-500");
      modeButton.classList.toggle("hover:bg-blue-600");
    }
    selectedMode = modeButton.id;
    modeButtons.forEach((mode) => mode.setAttribute("disabled", ""));
  })
);
