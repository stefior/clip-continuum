import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Navbar from "./Navbar";
import Modes from "./Modes";
import TextSection from "./TextSection";

function App() {
  const [isModeChosen, setModeChosen] = useState(false);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Modes isModeChosen={isModeChosen} setModeChosen={setModeChosen} />
        <TextSection isModeChosen={isModeChosen} />
        <footer className="mt-auto text-center">
          &#169; Stefior {new Date().getFullYear()}
        </footer>
      </div>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
