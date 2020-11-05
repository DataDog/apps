import { ChildClient } from '@datadog/framepost';

import { CapabilityManager } from './capabilites/capabilityManager';
import { capabilityManagers } from './capabilites';
import {
    Host,
    UiAppCapabilityType,
    UiAppEventToSubscribeType,
    UiAppEventToTriggerType,
    SDK_VERSION
} from './constants';
import { getLogger, Logger } from './logger';
import { AppContext, FrameContext, EventHandler, ClientOptions } from './types';

const DEFAULT_OPTIONS = {
    host: Host.STAGE,
    debug: false
};

export class DDClient {
    private readonly host: string;
    private readonly debug: boolean;
    private readonly framePostClient: ChildClient;
    private readonly logger: Logger;
    private capabilityManagers: CapabilityManager[];

    constructor(options: ClientOptions = {}) {
        this.host = options.host || DEFAULT_OPTIONS.host;
        this.debug = options.debug || DEFAULT_OPTIONS.debug;

        this.framePostClient = new ChildClient<AppContext>({
            debug: this.debug,
            profile: this.debug,
            context: {
                sdkVersion: SDK_VERSION
            } as FrameContext
        });

        this.logger = getLogger(options);

        this.capabilityManagers = capabilityManagers.map(
            Manager =>
                new Manager(
                    {
                        host: this.host,
                        debug: this.debug
                    },
                    this.framePostClient
                )
        );

        this.capabilityManagers.forEach(manager =>
            manager.applyAdditionalMethods(this)
        );
    }

    /**
     * Adds event handler to execute on a certain event type from the parent. Will print
     * an error if the installed app does not have the required capability. Returns an unsubscribe
     * method. This method can be called before handshake is successful, but handlers will not execute until
     * after successsful handshake.
     */
    on<T = any>(
        eventType: UiAppEventToSubscribeType,
        handler: EventHandler<T>
    ): () => void {
        const manager = this.getManagerByEventToSubscribeType(eventType);

        if (!manager) {
            this.logger.error('Unknown event type');

            return () => {};
        }

        const wrappedHandler: EventHandler<T> = async (...args) => {
            const isEnabled = await manager.isEnabled();

            if (isEnabled) {
                handler(...args);
            } else {
                this.logger.error(
                    `The ${manager.type} capability must be enabled to respond to events of type ${eventType}.`
                );
            }
        };

        return this.framePostClient.on(eventType, wrappedHandler);
    }

    /**
     * Triggers an event type to be handled in the parent. Will print
     * an error if the installed app does not have the required capability.
     * This method can be called before handshake is successful, but handlers will not execute until
     * after successsful handshake.
     */

    triggerEvent(eventType: UiAppEventToTriggerType, data: any = {}) {
        const manager = this.getManagerByEventToTriggerType(eventType);
        if (!manager) {
            this.logger.error('Unknown event type');
        } else {
            manager.triggerEvent(eventType, data);
        }
    }

    /**
     * Returns app context data, after it is sent from the parent
     */
    async getContext(): Promise<AppContext> {
        return this.framePostClient.getContext();
    }

    private getManagerByType(
        capabilityType: UiAppCapabilityType
    ): CapabilityManager | undefined {
        return this.capabilityManagers.find(
            manager => manager.type === capabilityType
        );
    }

    private getManagerByEventToSubscribeType(
        eventType: UiAppEventToSubscribeType
    ): CapabilityManager | undefined {
        return this.capabilityManagers.find(manager =>
            manager.eventsToSubscribe.includes(eventType)
        );
    }

    private getManagerByEventToTriggerType(
        eventType: UiAppEventToTriggerType
    ): CapabilityManager | undefined {
        return this.capabilityManagers.find(manager =>
            manager.eventsToTrigger.includes(eventType)
        );
    }
}
