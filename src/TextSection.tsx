import { useState, useEffect } from "react";

interface TextSectionProps {
  isModeChosen: boolean;
}

function TextSection({ isModeChosen }: TextSectionProps) {
  const [recording, setRecording] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (recording) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else if (!recording && timer !== 0) {
      clearInterval(interval!);
    }
    return () => clearInterval(interval!);
  }, [recording, timer]);

  return (
    <div className={`max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 relative`}>
      <div
        className={`flex flex-col items-center justify-center gap-1
        ${isModeChosen ? "bg-white" : "bg-gray-200"}`}
      >
        <div
          id="reading-area"
          className={`w-full rounded-t-lg p-6
          ${isModeChosen ? "bg-gray-700 text-white" : "bg-gray-200"}`}
        >
          ...
        </div>
        <div
          id="recording-buttons"
          className={`flex gap-1
          ${isModeChosen ? "" : "bg-gray-200"}`}
        >
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-bl"
            onClick={() => {
              setRecording(true);
              setTimer(0);
            }}
          >
            Start Next
          </button>
          <button
            className={`py-2 px-4
            ${
              isModeChosen
                ? "bg-red-500 hover:bg-red-600 text-white font-bold"
                : "bg-gray-200"
            }`}
            disabled={!isModeChosen}
          >
            Pause
          </button>
          <button
            className={`py-2 px-4
            ${
              isModeChosen
                ? "bg-red-500 hover:bg-red-600 text-white font-bold"
                : "bg-gray-200"
            }`}
            disabled={!isModeChosen}
          >
            Listen to Previous
          </button>
          <button
            className={`rounded-br-lg py-2 px-4
            ${
              isModeChosen
                ? "bg-red-500 hover:bg-red-600 text-white font-bold"
                : "bg-gray-200"
            }`}
            disabled={!isModeChosen}
          >
            End Session
          </button>
          <div className="absolute top-2 right-2 p-4 flex items-center space-x-2">
            {recording && (
              <div className="animate-ping w-2 h-2 rounded-full bg-red-600 opacity-75"></div>
            )}
            <div className="text-white">
              {Math.floor(timer / 60)}:
              {timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextSection;
