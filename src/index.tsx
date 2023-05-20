import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Navbar } from "./Navbar";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <footer className="mt-auto text-center">
          &#169; Stefior {new Date().getFullYear()}
        </footer>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
