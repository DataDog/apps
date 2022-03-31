export const setupDashboardCogMenu = client => {
    // provide cog menu items dynamically if needed
    client.dashboard.cogMenu.onRequest(() => {
        return {
            items: [
                {
                    actionType: 'link',
                    href: 'https://google.com',
                    label: 'link to google',
                    key: 'link',
                    order: -1
                }
            ]
        };
    });

    client.events.on('widget_settings_menu_click', context => {
        if (context.menuItem.key === 'open-confirmation') {
            client.modal.open({
                actionLabel: 'Yes',
                cancelLabel: 'Nevermind',
                title: 'Please verify!',
                key: 'confirmation-modal',
                actionLevel: 'danger',
                message: 'Are you sure really sure?'
            });
        }

        // open an iframe modal defined inline here in controller
        if (context.menuItem.key === 'open-custom-modal') {
            client.modal.open(
                {
                    key: 'custom-modal',
                    size: 'lg',
                    source: 'modal'
                },
                {
                    message:
                        'Hi! I was sent here from the custom widget settings menu 👋',
                    options: context.widget.definition.options
                }
            );
        }

        // open an iframe side panel defined inline here in controller
        if (context.menuItem.key === 'open-custom-panel') {
            console.log('xxxx context', context);
            client.sidePanel.open(
                {
                    key: 'custom-panel-from-controller',
                    source: 'panel',
                    title: 'Custom Sidepanel'
                },
                {
                    message:
                        'Hi! I was sent here from the custom widget settings menu 👋',
                    options: context.widget.definition.options
                }
            );
        }
    });

    // listen for cog menu click events
    client.events.on('dashboard_cog_menu_click', context => {
        if (context.menuItem.key === 'open-confirmation') {
            client.modal.open({
                actionLabel: 'Yes',
                cancelLabel: 'Nevermind',
                title: 'Please verify!',
                key: 'confirmation-modal',
                actionLevel: 'danger',
                message: 'Are you sure really sure?'
            });
        }

        // open an iframe modal defined inline here in controller
        if (context.menuItem.key === 'open-custom-modal') {
            client.modal.open(
                {
                    key: 'custom-modal',
                    size: 'lg',
                    source: 'modal'
                },
                {
                    message:
                        'Hi! I was sent here from the dashboard cog menu 👋'
                }
            );
        }

        // open an iframe side panel defined inline here in controller
        if (context.menuItem.key === 'open-custom-panel') {
            console.log('xxxx context', context);
            client.sidePanel.open(
                {
                    key: 'custom-panel-from-controller',
                    source: 'panel',
                    title: 'Custom Sidepanel'
                },
                {
                    message:
                        'Hi! I was sent here from the dashboard cog menu 👋'
                }
            );
        }
    });
};
