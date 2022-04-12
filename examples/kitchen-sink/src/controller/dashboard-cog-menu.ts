import {
    DashboardCogMenuClickData,
    DDClient,
    EventType
} from '@datadog/ui-extensions-sdk';
import * as React from 'react';

/**
 * This hook sets up any app-wide behavior for the dashboard cog menu.
 * @param client The initialized {@link DDClient}
 */
function useSetupDashboardCogMenu(client: DDClient): void {
    /**
     * We set up an event listener for the dashboard cog menu click handler.
     * This event handler lets us respond to click events.
     */
    React.useEffect(() => {
        const unsubscribeClick = client.events.on(
            EventType.DASHBOARD_COG_MENU_CLICK,
            async (data: DashboardCogMenuClickData): Promise<void> => {
                /**
                 * We only want to handle events from the `'show-posts'` menu item.
                 */
                if (data.menuItem.key !== 'show-posts') {
                    return;
                }

                /**
                 * We open the side panel that shows our 3rd-party {@link Post} data.
                 */
                await client.sidePanel.open({
                    key: 'side-panel-posts',
                    source: 'side-panel',
                    title: 'Posts'
                });
            }
        );

        /**
         * We make sure to unsubscribe the event listener we set up.
         */
        return () => {
            unsubscribeClick();
        };
    }, [client]);
}

export { useSetupDashboardCogMenu };
