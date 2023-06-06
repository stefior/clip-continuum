"use strict";

const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioContext;
let userAudio;
const recordingModeButton = document.querySelector(".mode-button"); //temporarily only the first one to show it works
const playButton = document.querySelector("#start-button");
const recordingsList = document.querySelector("#recordings-list");

recordingModeButton.addEventListener(
  "click",
  () => {
    audioContext = new AudioContext();
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
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

let timer = 0;
let timerInterval;
const timerNode = document.querySelector("#timer");
playButton.addEventListener("click", () => {

  if (!userAudio) {
    console.error("MediaRecorder not initialized");
    return;
  }

  if (playButton.dataset.playing === "false") {
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
  } else {
    userAudio.stop();
    playButton.dataset.playing = "false";
    timer = 0;
    clearInterval(timerInterval);

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
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
      });
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
