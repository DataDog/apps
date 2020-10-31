import type { ChildClient } from '@datadog/framepost';

import type { DDClient } from '../client';
import {
    UiAppCapabilityType,
    UiAppEventToSubscribeType,
    UiAppEventToTriggerType
} from '../constants';
import { getLogger, Logger } from '../logger';
import { AppContext, ClientOptions } from '../types';

export abstract class CapabilityManager {
    abstract type: UiAppCapabilityType;
    abstract eventsToSubscribe: UiAppEventToSubscribeType[];
    abstract eventsToTrigger: UiAppEventToTriggerType[];

    protected readonly host: string;
    protected readonly debug: boolean;
    protected readonly logger: Logger;
    protected readonly framePostClient: ChildClient<AppContext>;

    constructor(
        options: Required<ClientOptions>,
        framePostClient: ChildClient<AppContext>
    ) {
        this.host = options.host;
        this.debug = options.debug;
        this.logger = getLogger(options);
        this.framePostClient = framePostClient;
    }

    /**
     * A place for eventual extensions of the base client methods, specific to a capability
     * Example:
     * private getAdditionalClientMethods(): { [name: string]: Function } {
     *   return  {
     *     getTimeSeries: () => this.getTimeSeries();
     *   }
     * }
     */
    abstract getAdditionalClientMethods(): { [name: string]: Function };

    /**
     * Wraps additional methods in a check against the capability type, then applies to provided client object. Do not override
     */
    applyAdditionalMethods(client: DDClient) {
        const additionalMethods = this.getAdditionalClientMethods();

        const wrappedMethods: { [name: string]: Function } = {};

        Object.entries(additionalMethods).forEach(([key, method]) => {
            wrappedMethods[key] = async (...args: any[]) => {
                const isEnabled = await this.isEnabled();

                if (isEnabled) {
                    return method(...args);
                } else {
                    this.logger.error(
                        `The ${this.type} capability must be enabled to perform this action`
                    );
                }
            };
        });

        Object.assign(client, wrappedMethods);
    }

    async triggerEvent(eventType: UiAppEventToTriggerType, data: any) {
        const isEnabled = await this.isEnabled();

        if (isEnabled) {
            this.framePostClient.send(eventType, data);
        } else {
            this.logger.error(
                `The ${this.type} capability must be enabled to trigger events of type ${eventType}.`
            );
        }
    }

    async isEnabled(): Promise<boolean> {
        const { capabilities } = await this.framePostClient.getContext();

        return capabilities.includes(this.type);
    }
}
