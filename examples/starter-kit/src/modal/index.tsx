import { init } from "@datadog/ui-extensions-sdk";
import { useEffect, useState } from "react";
import "./../index.css";
import React from "react";
import ReactDOM from "react-dom";

const client = init();

function Modal() {
  const [clickCount, setClickCount] = useState(0);
  const [args, setArgs] = useState<any>();

  useEffect(() => {
    client.getContext().then(({ args }) => setArgs(args));
  }, [setArgs]);

  const onClick = () => {
    setClickCount(clickCount + 1);

    client.events.broadcast("modal_button_click", clickCount + 1);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p>
        This modal was opened programatically from the main app controller with
        these args
      </p>
      <blockquote style={{ backgroundColor: "#333", color: "#fff" }}>
        <p>
          <em>{JSON.stringify(args)}</em>
        </p>
      </blockquote>
      <button
        style={{ border: "none", background: "red", width: 400, height: 200 }}
        onClick={onClick}
      >
        Click the big red button!
      </button>
    </div>
  );
}

export default function render() {
  ReactDOM.render(
    <React.StrictMode>{<Modal />}</React.StrictMode>,
    document.getElementById("root")
  );
}
