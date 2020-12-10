import type { ChildClient } from '@datadog/framepost';

import {
    UiAppEventType,
    UiAppFeatureType,
    UiAppRequestType
} from '../constants';
import type { Context, EventHandler } from '../types';
import type { Logger } from '../utils/logger';
import { isEventEnabled, isFeatureEnabled } from '../utils/utils';

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
    on<T = any>(
        eventType: UiAppEventType,
        handler: EventHandler<T>
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
                    context.appContext.features
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
    async broadcast<T = any>(
        eventType: string,
        data: T
    ): Promise<BroadcastResponse> {
        const context = await this.framePostClient.getContext();

        const canSendCustomEvents = isFeatureEnabled(
            UiAppFeatureType.CUSTOM_EVENTS,
            context.appContext.features
        );

        if (!canSendCustomEvents) {
            this.logger.error(
                `Event broadcasting requires the ${UiAppFeatureType.CUSTOM_EVENTS} feature`
            );

            return {
                success: false
            };
        }

        return this.framePostClient.request<
            CustomEventPayload<T>,
            BroadcastResponse
        >(UiAppRequestType.EVENT_BROADCAST, {
            eventType,
            data
        });
    }
}
export interface BroadcastResponse {
    success: boolean;
}

export interface CustomEventPayload<T> {
    eventType: string;
    data: T;
}
