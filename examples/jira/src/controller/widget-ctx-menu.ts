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
                    key: 'jira-new-issue-modal',
                    label: 'Create new issue'
                },
                {
                    actionType: MenuItemType.EVENT,
                    key: 'jira-add-to-ticket-modal',
                    label: 'Add to ticket'
                }
            ]
        };
    });

    client.events.on(EventType.WIDGET_CONTEXT_MENU_CLICK, context => {
        switch (context.menuItem.key) {
            case 'jira-new-issue-modal': {
                client.modal.open(
                    {
                        key: 'jira-new-issue-modal',
                        source: 'jira-new-issue-modal',
                        size: ModalSize.MEDIUM,
                        title: 'Create new issue'
                    }
                )
                break
            }
            case 'jira-add-to-ticket-modal': {
                client.modal.open(
                    {
                        key: 'jira-add-to-ticket-modal',
                        source: 'jira-add-to-ticket-modal',
                        size: ModalSize.MEDIUM
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
