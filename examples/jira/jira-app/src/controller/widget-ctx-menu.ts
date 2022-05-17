import {
    MenuItemType,
    EventType,
    DDClient,
    ModalSize
} from '@datadog/ui-extensions-sdk';

export const setupWidgetCtxMenu = (client: DDClient) => {
    // provide widget context menu items dynamically
    client.widgetContextMenu.onRequest(({ widget }) => {
        return {
            items: [
                {
                    actionType: MenuItemType.EVENT,
                    key: 'jira-new-ticket-modal',
                    label: "Create new Jira's ticket"
                },
                {
                    actionType: MenuItemType.EVENT,
                    key: 'jira-update-ticket-modal',
                    label: "Update Jira's ticket"
                }
            ]
        };
    });

    client.events.on(EventType.WIDGET_CONTEXT_MENU_CLICK, context => {
        const timeframe = context?.dashboard?.timeframe
        const requests = context.widget.definition.requests

        switch (context.menuItem.key) {
            case 'jira-new-ticket-modal': {
                client.modal.open(
                    {
                        key: 'jira-new-ticket-modal',
                        source: 'jira-new-ticket-modal',
                        size: ModalSize.MEDIUM,
                        title: "Create new Jira's ticket",
                    },
                    {
                        timeframe,
                        requests
                    }
                )
                break
            }
            case 'jira-update-ticket-modal': {
                client.modal.open(
                    {
                        key: 'jira-update-ticket-modal',
                        source: 'jira-update-ticket-modal',
                        size: ModalSize.MEDIUM,
                        title: "Updating a Jira's ticket"
                    }
                )
                break
            }
            default: {
                console.log("Unknown menuItem")
            }
        }

    });
};
