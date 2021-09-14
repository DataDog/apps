import type { DDClient } from '../client/client';
import { EventType, RequestType } from '../constants';
import type {
    Context,
    EventHandler,
    Timeframe,
    TemplateVariableValue,
    ModalDefinition,
    WidgetContextMenuClickData,
    WidgetSettingsMenuClickData,
    DashboardCogMenuClickData,
    SidePanelDefinition,
    AuthState,
    APIAccessChangeEvent
} from '../types';
import { isEventEnabled } from '../utils/utils';

// This interface mapping provides types for event handlers subscribed to with `client.events.on`
interface DDEventDataTypes<AuthStateArgs> {
    // General
    [EventType.CUSTOM_EVENT]: CustomEventPayload<any>;
    [EventType.CONTEXT_CHANGE]: Context;
    [EventType.DASHBOARD_COG_MENU_CLICK]: DashboardCogMenuClickData;
    [EventType.WIDGET_CONTEXT_MENU_CLICK]: WidgetContextMenuClickData;
    [EventType.WIDGET_SETTINGS_MENU_CLICK]: WidgetSettingsMenuClickData;
    [EventType.MODAL_CLOSE]: ModalDefinition;
    [EventType.MODAL_CANCEL]: ModalDefinition;
    [EventType.MODAL_ACTION]: ModalDefinition;
    [EventType.SIDE_PANEL_CLOSE]: SidePanelDefinition;
    [EventType.DASHBOARD_TIMEFRAME_CHANGE]: Timeframe;
    [EventType.DASHBOARD_CURSOR_CHANGE]: number | null;
    [EventType.DASHBOARD_TEMPLATE_VAR_CHANGE]: TemplateVariableValue[];
    [EventType.DASHBOARD_CUSTOM_WIDGET_OPTIONS_CHANGE]: {
        [key: string]: string | boolean;
    };

    // Modals
    [EventType.MODAL_CLOSE]: ModalDefinition;
    [EventType.MODAL_CANCEL]: ModalDefinition;
    [EventType.MODAL_ACTION]: ModalDefinition;

    // Auth
    [EventType.AUTH_STATE_CHANGE]: AuthState<AuthStateArgs>;
    [EventType.API_ACCESS_CHANGE]: APIAccessChangeEvent;
}

export class DDEventsClient<AuthStateArgs = unknown> {
    private readonly client: DDClient<AuthStateArgs>;

    constructor(client: DDClient<AuthStateArgs>) {
        this.client = client;
    }

    /**
     * Adds event handler to execute on a certain event type from the parent. Returns an unsubscribe
     * method. This method can be called before handshake is successful, but handlers will not execute until
     * after. Will print an error if the installed app does not have the required features to handle the event type.
     */
    on<K extends keyof DDEventDataTypes<AuthStateArgs>>(
        eventType: K,
        handler: EventHandler<DDEventDataTypes<AuthStateArgs>[K]>
    ): () => void {
        // first, immediately subscribe
        const unsubscribe = this.client.framePostClient.on(eventType, handler);

        // kick off async process to message access errors after handshake succeeds.
        // failure also unsubscribes. This routine is to message errors to devs.
        // actual gating of events happens in the main datadog UI
        this.client
            .getContext()
            .then(context => {
                if (context) {
                    const canHandleEvent = isEventEnabled(
                        eventType,
                        context.app.features
                    );

                    if (!canHandleEvent) {
                        unsubscribe();
                        this.client.logger.error(
                            `Your app does not have the required features enabled to respond to events of type ${eventType}.`
                        );
                    }
                }
            })
            .catch(() => {});

        return unsubscribe;
    }

    /**
     * Adds event handler to execute on a custom event from the parent. Returns an unsubscribe
     * method. This method can be called before handshake is successful, but handlers will not execute until
     * after. Will print an error if the installed app does not have the custom_events feature enabled
     */
    onCustom<T = any>(eventType: string, handler: EventHandler<T>) {
        const wrappedHandler: EventHandler<CustomEventPayload<T>> = payload => {
            if (payload.eventType === eventType) {
                handler(payload.data);
            }
        };
        return this.on(EventType.CUSTOM_EVENT, wrappedHandler);
    }

    /**
     * Broadcasts a custom event to all active iframes. Returns a list of the iframe urls that received the event
     * for debug purposes
     */
    async broadcast<T = any>(eventType: string, data: T) {
        return this.client.framePostClient.request<
            CustomEventPayload<T>,
            undefined
        >(RequestType.EVENT_BROADCAST, {
            eventType,
            data
        });
    }
}

export interface CustomEventPayload<T> {
    eventType: string;
    data: T;
}
