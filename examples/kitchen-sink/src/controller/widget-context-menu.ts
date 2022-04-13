import {
    DDClient,
    EventType,
    ModalSize,
    WidgetContextMenuClickData
} from '@datadog/ui-extensions-sdk';
import * as React from 'react';
import { getHostInformation, HostInformation } from '../3rd-party/host';

/**
 * We handle clicks on hostmap widgets.
 *
 * This expects to be used when a hostmap widget is clicked and attempts to find the host that was clicked on.
 * Assuming the host is found,
 * it will grab the {@link HostInformation} from the 3rd-party.
 * Assuming that {@link HostInformation} is found,
 * it will open a modal to render the {@link HostInformation}.
 *
 * @param client An initialized {@link DDClient}.
 * @param groupTags Whatever the hostmap widget is grouped by.
 */
async function handleHostmapWidget(
    client: DDClient,
    groupTags: string[]
): Promise<void> {
    const host: string | undefined = groupTags
        .map(parseHostname)
        .find((hostname?: string): boolean => {
            return hostname != null;
        });
    /**
     * Bail if there was no host found.
     */
    if (host == null) {
        return;
    }

    /**
     * We try to get the {@link HostInformation} from the 3rd-party.
     * Bail if the 3rd-party had no {@link HostInformation}.
     */
    const hostInformation:
        | HostInformation
        | undefined = await getHostInformation(host);
    if (hostInformation == null) {
        return;
    }

    /**
     * We display the {@link HostInformation} we received from the 3rd-party in a modal.
     *
     * We want to pass the {@link HostInformation} to the modal,
     * so we send it along as the second argument.
     * On the other side,
     * the modal will receive this information and use it for rendering.
     */
    await client.modal.open(
        {
            key: 'host information modal',
            size: ModalSize.MEDIUM,
            source: 'modal',
            title: 'Host Information'
        },
        hostInformation
    );
}

/**
 * We attempt to parse out the hostname from a `groupTag`.
 * @param groupTag This should be in the form `key:value`.
 * @returns The parsed hostname if it exists.
 */
function parseHostname(groupTag: string): string | undefined {
    const [hostTag, hostName] = groupTag.split(':', 2);
    if (hostTag !== 'host') {
        return undefined;
    }

    return hostName;
}

/**
 * This hook sets up any app-wide behavior for the widget context menu.
 * @param client The initialized {@link DDClient}
 */
function useSetupWidgetContextMenu(client: DDClient): void {
    /**
     * We set up an event listener for the widget context menu click handler.
     * This event handler lets us respond to click events.
     */
    React.useEffect(() => {
        const unsubscribeClick = client.events.on(
            EventType.WIDGET_CONTEXT_MENU_CLICK,
            async (data: WidgetContextMenuClickData): Promise<void> => {
                /**
                 * We decide what to do based on which type of widget was clicked.
                 * Each of the widgets has a different model for their definition.
                 * What's important here is the type of widget
                 *
                 * @see https://docs.datadoghq.com/dashboards/widgets
                 */
                switch (data.widget.definition.type) {
                    case 'hostmap':
                        await handleHostmapWidget(
                            client,
                            data.widgetInteraction.groupTags
                        );
                        break;

                    /**
                     * We're not handling clicks from any other types of widgets.
                     * If we wanted to,
                     * we would look at the other types available and process the data similarly.
                     */
                    default:
                        break;
                }
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

export { useSetupWidgetContextMenu };
