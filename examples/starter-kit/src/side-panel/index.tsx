import { init } from "@datadog/ui-extensions-sdk";
import { useState, useEffect } from "react";
import "./../index.css";
import React from "react";
import ReactDOM from "react-dom";

const client = init();

function SidePanel() {
  const [args, setArgs] = useState<any>();

  useEffect(() => {
    client.getContext().then(({ args }) => setArgs(args));
  }, [setArgs]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p>This side panel was opened programatically with these args </p>
      <blockquote style={{ backgroundColor: "#333", color: "#fff" }}>
        <p>
          <em>{JSON.stringify(args)}</em>
        </p>
      </blockquote>
    </div>
  );
}

export default function render() {
  ReactDOM.render(
    <React.StrictMode>{<SidePanel />}</React.StrictMode>,
    document.getElementById("root")
  );
}
