import {
  WidgetOptionItemType,
  init,
  EventType,
} from "@datadog/ui-extensions-sdk";
import "./../index.css";
import React from "react";
import ReactDOM from "react-dom";

import "./widget.css";
import "typeface-roboto";
import "milligram";
import { useEffect, useState } from "react";

const client = init();

function Widget() {
  const [image, setImage] = useState("");

  useEffect(() => {
    console.log("running");

    client.events.on(
      EventType.DASHBOARD_CUSTOM_WIDGET_OPTIONS_CHANGE,
      async ({ breed }) => {
        if (typeof breed !== "string") {
          return;
        }
        getImage(breed);
      }
    );
  }, []);

  async function cycleImage() {
    const breed = await client.getContext().then((c) => {
      return c.widget?.definition.options?.breed;
    });
    getImage(breed);
  }

  async function getImage(breed: string) {
    const imageUrl = await fetch(
      `http://localhost:3001/image?breed_id=${breed}`
    )
      .then((response) => response.json())
      .then((data) => {
        return data.imageUrl;
      });
    console.log(imageUrl);
    setImage(imageUrl);
  }

  var imageElement;

  if (image) {
    imageElement = React.createElement("img", { src: image }, null);
  }

  fetch("http://localhost:3001/breeds")
    .then((response) => response.json())
    .then((data) => {
      var options = [{ label: "All Breeds", value: "0" }];
      data.breeds.forEach((breed: { name: string; id: number }) => {
        options.push({ label: breed.name, value: breed.id.toString() });
      });

      client.dashboard.customWidget.updateOptions([
        {
          type: WidgetOptionItemType.STRING,
          name: "breed",
          label: "Select a Dog Breed to see Random Images of",
          enum: options,
          order: 1,
        },
      ]);
    });

  return (
    <div>
      <div id="button-wrapper">
        <button id="new-dog" onClick={cycleImage}>
          New Dog
        </button>
      </div>
      <div className="image-wrapper">{imageElement}</div>
    </div>
  );
}

export default function render() {
  ReactDOM.render(
    <React.StrictMode>{<Widget />}</React.StrictMode>,
    document.getElementById("root")
  );
}
