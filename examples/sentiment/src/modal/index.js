import { init } from "@datadog/ui-extensions-sdk";
import "./../index.css";
import React from "react";
import ReactDOM from "react-dom";

const client = init();

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
        <p>This modal was opened by defining a cog menu item in app-manifest.json with the key 'open-custom-modal'. </p>

        <p>We are mocking api calls with data coming from the Twitter Developer API, as well as faking sentiment analysis based off Microsoft's Text Analytics</p>

        <p>To learn more about the programming model, and to understand how we pass context around, please visit <a href="https://github.com/DataDog/apps/blob/master/docs/en/programming-model.md">the documentation.</a></p>

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