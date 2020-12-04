import type { ChildClient } from '@datadog/framepost';

import type { UiAppEventType } from '../constants';
import { isEventEnabled } from '../features/utils';
import type { Logger } from '../logger';
import type { Context, EventHandler } from '../types';

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
        eventType: UiAppEventType | string,
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
                const isEnabled = isEventEnabled(
                    eventType,
                    context.appContext.features
                );

                if (!isEnabled) {
                    unsubscribe();
                    this.logger.error(
                        `Your app does not have the required features enabled to respond to events of type ${eventType}.`
                    );
                }
            })
            .catch(() => {});

        return unsubscribe;
    }
}
