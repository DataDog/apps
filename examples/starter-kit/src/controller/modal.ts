import { DDClient, UiAppEventType } from "@datadog/ui-apps-sdk";

export const setupModal = (client: DDClient) => {
  // listen for modal events
  client.events.on(UiAppEventType.MODAL_ACTION, () => {
    console.log("Confirmed!");
  });

  client.events.on(UiAppEventType.MODAL_CANCEL, () => {
    console.log("Denied!");
  });

  client.events.on(UiAppEventType.MODAL_CLOSE, (definition) => {
    console.log(`User exited modal ${definition.key}`);
  });

  // listen for a custom event sent from modal IFrame
  client.events.onCustom("modal_button_click", (count: number) => {
    console.log(`The user has clicked the button ${count} times`);
  });
};
