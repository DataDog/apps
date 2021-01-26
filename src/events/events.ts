import type { ChildClient } from '@datadog/framepost';

import { UiAppEventType, UiAppRequestType } from '../constants';
import type {
    Context,
    EventHandler,
    FeatureContext,
    Timeframe,
    TemplateVariableValue,
    ModalDefinition
} from '../types';
import type { Logger } from '../utils/logger';
import { isEventEnabled } from '../utils/utils';

// This interface mapping provides types for event handlers subscribed to with `client.events.on`
interface DDEventDataTypes {
    // General
    [UiAppEventType.CUSTOM_EVENT]: CustomEventPayload<any>;

    // Dashboards
    [UiAppEventType.DASHBOARD_COG_MENU_CLICK]: Required<
        Pick<FeatureContext, 'dashboard' | 'menuItem'>
    >;
    [UiAppEventType.DASHBOARD_CONTEXT_MENU_CLICK]: Required<
        Pick<FeatureContext, 'dashboard' | 'widget' | 'menuItem'>
    >;
    [UiAppEventType.DASHBOARD_TIMEFRAME_CHANGE]: Timeframe;
    [UiAppEventType.DASHBOARD_TEMPLATE_VAR_CHANGE]: TemplateVariableValue[];
    [UiAppEventType.DASHBOARD_CUSTOM_WIDGET_OPTIONS_CHANGE]: {
        [key: string]: any;
    };

    // Modals
    [UiAppEventType.MODAL_CLOSE]: ModalDefinition;
    [UiAppEventType.MODAL_CANCEL]: ModalDefinition;
    [UiAppEventType.MODAL_ACTION]: ModalDefinition;
}

export class DDEventsClient {
    private readonly debug: boolean;
    private readonly logger: Logger;
    private readonly framePostClient: ChildClient<Context>;

    constructor(debug: boolean, logger: Logger, framePostClient: ChildClient) {
        this.debug = debug;
        this.logger = logger;
        this.framePostClient = framePostClient;
    }

    /**
     * Adds event handler to execute on a certain event type from the parent. Returns an unsubscribe
     * method. This method can be called before handshake is successful, but handlers will not execute until
     * after. Will print an error if the installed app does not have the required features to handle the event type.
     */
    on<K extends keyof DDEventDataTypes>(
        eventType: K,
        handler: EventHandler<DDEventDataTypes[K]>
    ): () => void {
        // first, immediately subscribe
        const unsubscribe = this.framePostClient.on(eventType, handler);

        // kick off async process to message access errors after handshake succeeds.
        // failure also unsubscribes. This routine is to message errors to devs.
        // actual gating of events happens in the main datadog UI
        this.framePostClient
            .getContext()
            .then(context => {
                const canHandleEvent = isEventEnabled(
                    eventType,
                    context.app.features
                );

                if (!canHandleEvent) {
                    unsubscribe();
                    this.logger.error(
                        `Your app does not have the required features enabled to respond to events of type ${eventType}.`
                    );
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
        return this.on(UiAppEventType.CUSTOM_EVENT, wrappedHandler);
    }

    /**
     * Broadcasts a custom event to all active iframes. Returns a list of the iframe urls that received the event
     * for debug purposes
     */
    async broadcast<T = any>(eventType: string, data: T) {
        return this.framePostClient.request<CustomEventPayload<T>, undefined>(
            UiAppRequestType.EVENT_BROADCAST,
            {
                eventType,
                data
            }
        );
    }
}

export interface CustomEventPayload<T> {
    eventType: string;
    data: T;
}
