import { init } from "@datadog/ui-apps-sdk";
import "./../index.css";
import React from "react";
import ReactDOM from "react-dom";

const client = init({ debug: true });

function Modal() {

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="modal-wrapper">
        <p>This modal was opened programatically from the main app controller</p>

        <p>We are mocking api calls with data coming from the Twitter Developer API, as well as faking sentiment analysis based off Microsoft's Text Analytics</p>

      </div>
    </div>
  );
}

export default function render() {
  ReactDOM.render(
    <React.StrictMode>{<Modal />}</React.StrictMode>,
    document.getElementById("root")
  );
}