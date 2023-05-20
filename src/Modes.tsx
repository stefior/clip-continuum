import { useNavigate } from "react-router-dom";
import { useState, ChangeEvent } from "react";

interface ModesProps {
  isModeChosen: boolean;
  setModeChosen: (chosen: boolean) => void;
}

function Modes({ isModeChosen, setModeChosen }: ModesProps) {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;

    const extension = file.name.split(".").pop();

    if (extension !== "csv") {
      alert("Only CSV files are allowed!");
      return;
    }

    setSelectedFile(file);
    setSelectedMode("mode2");
  };

  const handleModeSelect = (mode: string) => {
    if (mode !== selectedMode) {
      setSelectedMode(mode);
      setModeChosen(true)
    }
  };

  const getButtonClasses = (mode: string) => {
    let classes = "text-white font-bold py-2 px-4 rounded ";
    classes +=
      selectedMode === mode ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600 ";
    return classes;
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Choose your mode</h1>
      <div className="mt-5 grid grid-cols-3 gap-10">
        <button
          className={getButtonClasses("mode1")}
          onClick={() => {
            navigate("/mode1");
            handleModeSelect("mode1");
          }}
        >
          Manual Input
        </button>
        <button className={getButtonClasses("mode2")}>
          <label htmlFor="upload-csv" className="cursor-pointer">
            Upload CSV
            <input
              type="file"
              id="upload-csv"
              accept=".csv"
              onChange={changeHandler}
              hidden
            />
          </label>
        </button>
        <button
          className={getButtonClasses("mode3")}
          onClick={() => {
            navigate("/mode3");
            handleModeSelect("mode3");
          }}
        >
          Sequential
        </button>
      </div>
      <div className="mt-5 flex gap-2 items-center justify-center">
        <p className="text-xl font-medium text-gray-900">Download Location:</p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Browser Default
        </button>
      </div>
    </div>
  );
}

export default Modes;
