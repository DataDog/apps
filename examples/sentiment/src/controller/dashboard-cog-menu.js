import {
  UiAppEventType,
  ModalSize,
  MenuItemType
} from "@datadog/ui-apps-sdk";

export const setupDashboardCogMenu = (client) => {
  // provide cog menu items dynamically if needed

  client.dashboard.cogMenu.onRequest(() => {
    return {
      // Setting up a custom cog menu URL.
      items: [{
        actionType:MenuItemType.LINK,
        href: 'https://developer.twitter.com/',
        label:'Twitter Developer Portal',
        key:'link',
        order: 2
      }],
    };
  });

  // listen for cog menu click events
  client.events.on(UiAppEventType.DASHBOARD_COG_MENU_CLICK, (context) => {

    // open an iframe modal defined inline here in controller
    if (context.menuItem.key === "open-custom-modal") {
      client.modal.open({
        key: "custom-modal",
        size: ModalSize.LARGE,
        source: "modal"
      });
    }

  });
};