import { EventType } from "@datadog/ui-extensions-sdk";

export const setupModal = (client) => {
  // listen for modal events
  client.events.on(EventType.MODAL_ACTION, () => {
    console.log("Confirmed!");
  });

  client.events.on(EventType.MODAL_CANCEL, () => {
    console.log("Denied!");
  });

  client.events.on(EventType.MODAL_CLOSE, (definition) => {
    console.log(`User exited modal ${definition.key}`);
  });

  // listen for a custom event sent from modal IFrame
  client.events.onCustom("modal_button_click", (number) => {
    console.log(`The user has clicked the button ${number} times`);
  });
};