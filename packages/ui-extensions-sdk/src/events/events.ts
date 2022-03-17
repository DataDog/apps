import { EventType, RequestType } from '../constants';
import type {
    APIAccessChangeEvent,
    AuthState,
    Context,
    ContextClient,
    DashboardCogMenuClickData,
    EventClient,
    EventHandler,
    IFrameDimensions,
    LoggerClient,
    ModalDefinition,
    RequestClient,
    SidePanelDefinition,
    DeprecatedUsage,
    TemplateVariableValue,
    Timeframe,
    WidgetContextMenuClickData,
    WidgetSettingsMenuClickData
} from '../types';
import { isEventEnabled } from '../utils/utils';

// This interface mapping provides types for event handlers subscribed to with `client.events.on`
interface DDEventDataTypes<AuthStateArgs> {
    // General
    [EventType.CUSTOM_EVENT]: CustomEventPayload<any>;
    [EventType.CONTEXT_CHANGE]: Context;
    [EventType.RESIZE_IFRAME]: IFrameDimensions;
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

const deprecationWarnings: Partial<Record<EventType, string>> = {
    [EventType.DASHBOARD_TIMEFRAME_CHANGE]:
        'The "dashboard_timeframe_change" event is deprecated. You may subcribe to updated dashboard timeframes from the more general "context_change" event.',
    [EventType.DASHBOARD_TEMPLATE_VAR_CHANGE]:
        'The "dashboard_template_var_change" event is deprecated. You may subscribe to template variable changes from the more general "context_change" event.'
};

export class DDEventsClient<AuthStateArgs = unknown> {
    private readonly client: ContextClient &
        EventClient &
        LoggerClient &
        RequestClient;

    constructor(
        client: ContextClient & EventClient & LoggerClient & RequestClient
    ) {
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
        const unsubscribe = this.client.on(eventType, handler);

        // kick off async process to message access errors after handshake succeeds.
        // failure also unsubscribes. This routine is to message errors to devs.
        // actual gating of events happens in the main datadog UI
        this.client
            .getContext()
            .then(context => {
                const canHandleEvent = isEventEnabled(
                    eventType,
                    context.app.features
                );

                if (!canHandleEvent) {
                    unsubscribe();
                    this.client.logError(
                        `Your app does not have the required features enabled to respond to events of type ${eventType}.`
                    );
                } else {
                    this.logDeprecationWarning(eventType);
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
        return this.client.request<CustomEventPayload<T>, undefined>(
            RequestType.EVENT_BROADCAST,
            {
                eventType,
                data
            }
        );
    }

    private async logDeprecationWarning(eventType: EventType) {
        // For now, an event is considered deprecated if it has a warning in the above index
        const warning = deprecationWarnings[eventType];

        if (warning) {
            this.client.logWarning(warning);
            try {
                await this.client.request<DeprecatedUsage, void>(
                    RequestType.LOG_DEPRECATED_USAGE,
                    {
                        entity: 'event',
                        eventType
                    }
                );
            } catch (e) {
                //
            }
        }
    }
}

export interface CustomEventPayload<T> {
    eventType: string;
    data: T;
}
