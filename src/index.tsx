import ReactDom from "react-dom/client";
import React from "react";
import App from "./App";
import "./assets/css/common.css";
import "./assets/scss/common.scss";
import "./assets/scss/b.scss";
import "./assets/css/tailwind.css";

const root = ReactDom.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
