import { MessageType } from './constants';
import type { Deferred, Message, Channel, EventHandler } from './types';
import { defer, randomInsecureId } from './utils';

export interface SharedClientOptions {
    debug?: boolean;
    profile?: boolean;
}

export abstract class SharedClient<C> {
    protected readonly debug: boolean;
    protected readonly profile: boolean;
    protected readonly channel: Deferred<Channel<C>>;
    protected subscriptions: {
        [eventType: string]: { [id: string]: EventHandler };
    };

    constructor({ debug = false, profile = false }: SharedClientOptions = {}) {
        this.debug = debug;
        this.profile = profile;
        this.channel = defer();
        this.subscriptions = {};
        this.messageListener = this.messageListener.bind(this);
        window.addEventListener('message', this.messageListener);
    }

    protected abstract messageListener(event: MessageEvent<Message>): void;

    abstract send<T = any>(eventType: string, data: T): void;

    on<T = any>(eventType: string, handler: EventHandler<T>): () => void {
        if (!this.subscriptions[eventType]) {
            this.subscriptions[eventType] = {};
        }
        const id = randomInsecureId(8);
        this.subscriptions[eventType][id] = handler;
        return () => {
            const { [id]: _, ...otherSubscriptions } = this.subscriptions[
                eventType
            ];
            this.subscriptions[eventType] = otherSubscriptions;
        };
    }

    async getContext(): Promise<C> {
        const { context } = await this.channel.promise;
        return context;
    }

    destroy() {
        window.removeEventListener('message', this.messageListener);
    }

    protected async postMessage<T = any>(
        type: MessageType,
        eventType: string,
        data: T
    ) {
        const { source, origin } = await this.channel.promise;
        const message: Message = {
            type,
            eventType,
            data,
            id: randomInsecureId()
        };
        source.postMessage(message, origin);
    }

    protected async sanitizeMessage<T = any>(
        event: MessageEvent<any>
    ): Promise<Message<T> | null> {
        const { source } = await this.channel.promise;
        if (event.source !== source) {
            return null;
        }
        const message = event.data;
        if (!message.type || !message.id) {
            return null;
        }
        return message as Message<T>;
    }

    protected async handleEvent<T = any>(event: MessageEvent<any>) {
        const message = await this.sanitizeMessage<T>(event);
        if (message) {
            const subscriptions = this.subscriptions[message.eventType] || {};
            Object.values(subscriptions).forEach(handler =>
                handler(message.data)
            );
        }
    }
}
