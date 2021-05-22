import React from "react";
import ReactDOM from "react-dom";
// import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App";
import Application from "./pages/Application";
import "./Index.module.scss";

ReactDOM.render(
  <React.StrictMode>
    {/* <Router> */}
      {/* <App/> */}
      <Application />
    {/* </Router> */}
  </React.StrictMode>,
  document.getElementById("root")
);
