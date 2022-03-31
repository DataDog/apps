export const setupWidgetCtxMenu = client => {
    // provide widget context menu items dynamically
    client.widgetContextMenu.onRequest(({ widget }) => {
        return {
            items: [
                {
                    href: `https://docs.datadoghq.com/dashboards/widgets/${widget.definition.type}/`,
                    actionType: 'link',
                    key: 'link-item',
                    label: `Read about ${widget.definition.type} widgets`,
                    order: 3
                },
                {
                    actionType: 'event',
                    // this key is used below to determine which action to take upon click
                    key: 'sidepanel-trigger',
                    label: `Open a sidepanel`,
                    order: 1
                }
            ]
        };
    });

    // listen for ctx menu click events

    client.events.on('widget_context_menu_click', context => {
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
