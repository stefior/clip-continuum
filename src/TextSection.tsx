interface TextSectionProps {
  isModeChosen: boolean;
}

function TextSection({ isModeChosen }: TextSectionProps) {
  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div
        className={`flex flex-col items-center justify-center 
        ${isModeChosen ? "bg-gray-800" : "bg-gray-200"}`}
      >
        <div
          className={`w-full rounded-t-lg p-2 
          ${isModeChosen ? "bg-gray-900 text-white" : "bg-gray-200"}`}
        >
          ...
        </div>
        <div
          className={`flex gap-2 mt-2
          ${isModeChosen ? "" : "bg-gray-200"}`}
        >
          <button
            className={`rounded-bl-lg py-2 px-4
            ${
              isModeChosen
                ? "bg-red-500 hover:bg-red-600 text-white font-bold"
                : "bg-gray-200"
            }`}
            disabled={!isModeChosen}
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
        </div>
      </div>
    </div>
  );
}

export default TextSection;
