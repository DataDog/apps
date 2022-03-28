import { MenuItemType, EventType, DDClient } from '@datadog/ui-extensions-sdk';

export const setupWidgetCtxMenu = (client: DDClient) => {
    // provide widget context menu items dynamically
    client.widgetContextMenu.onRequest(({ widget }) => {
        return {
            items: [
                {
                    actionType: MenuItemType.EVENT,
                    key: 'jira-modal',
                    label: 'Create Jira ticket'
                }
            ]
        };
    });

    client.events.on(EventType.WIDGET_CONTEXT_MENU_CLICK, context => {
        if (context.menuItem.key === 'jira-modal') {
            client.modal.open(
                {
                    key: 'hello-world-modal',
                    source: 'modal'
                }
            )
        }


        if (context.menuItem.key === 'sidepanel-trigger') {
            client.sidePanel.open(
                {
                    key: 'custom-panel-from-controller',
                    source: 'panel'
                },
                {
                    message:
                        'Hi! I was sent here from the widget context menu 👋'
                }
            );
        }
    });
};
