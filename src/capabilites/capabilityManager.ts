import { AppContext, ClientOptions, EventHandler, HandleEventParams } from '../types';
import { UiAppCapabilityType, UiAppEventType } from '../constants';
import { getLogger, Logger } from '../logger';
import * as Postmate from "postmate";
import { Deferred, uniqueInt } from '../utils';
import type { DDClient } from '../client';

export abstract class CapabilityManager {
    abstract type: UiAppCapabilityType;
    abstract events: UiAppEventType[];

    protected readonly host: string;
    protected readonly debug: boolean;
    protected readonly logger: Logger;
    protected readonly handshake: Postmate.Model;
    protected readonly context: Deferred<AppContext>
    private subscriptions: { [key in UiAppEventType]?: { [id: number]: EventHandler}}

    constructor(options: ClientOptions, handshake: Postmate.Model, context: Deferred<AppContext>) {
        this.host = options.host;
        this.debug = options.debug;
        this.logger = getLogger(options);
        this.handshake = handshake;
        this.context = context;
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
    abstract getAdditionalClientMethods(): { [name: string]: Function }

    /**
     * Wraps additional methods in a check against the capability type, then applies to provided client object. Do not override
     */
    applyAdditionalMethods(client: DDClient) {
        const additionalMethods = this.getAdditionalClientMethods();

        const wrappedMethods = {};

        Object.entries(additionalMethods).forEach(([key, method]) => {
            wrappedMethods[key] = async (...args) => {
                const isEnabled = await this.isEnabled();

                if (isEnabled) {
                    return method(...args);
                } else {
                    this.logger.error(`The ${this.type} capability must be enabled to perform this action`)
                }
            }
        })

        Object.assign(client, wrappedMethods);
    }

    /**
     * Called by the client to register an event handler managed by this capability. Do not override
     */
    subscribeHandler<T>(eventType: UiAppEventType, handler: EventHandler<T>): () => void {
        const subscriptionId = uniqueInt();

        this.subscriptions[eventType][subscriptionId] = handler;

        return () => {
            const { [subscriptionId]: _, ...otherSubscriptions } = this.subscriptions[eventType];

            this.subscriptions[eventType] = otherSubscriptions;
        }
    }

    /**
     * Called by the client to delgate event handling. Do not override
     */
    async handleEvent<T>({ eventType, data }: HandleEventParams<T>) {
        const hasHandlers = this.hasHandlers(eventType);

        if (!hasHandlers) {
            return;
        }

        const isEnabled = await this.isEnabled();

        if (isEnabled) {
            const subscriptions = this.subscriptions[eventType];

            Object.values(subscriptions).forEach(handler => handler(data))
        } else {
            this.logger.error(`The ${this.type} capability must be enabled to respond to events of type ${eventType}.`)
        }
    }

    async isEnabled(): Promise<boolean> {
        const { capabilities } = await this.context.promise;

        return capabilities.includes(this.type);
    }

    hasHandlers(eventType: UiAppEventType): boolean {
        return !!Object.keys(this.subscriptions[eventType]).length
    }
}