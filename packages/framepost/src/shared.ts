import { MessageType } from './constants';
import { Logger } from './logger';
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
    protected readonly logger: Logger;
    protected subscriptions: {
        [eventType: string]: { [id: string]: EventHandler };
    };

    constructor({ debug = false, profile = false }: SharedClientOptions = {}) {
        this.debug = debug;
        this.profile = profile;
        this.channel = defer();
        this.subscriptions = {};

        this.logger = this.getLogger();

        this.messageListener = this.messageListener.bind(this);
        window.addEventListener('message', this.messageListener);

        this.logger.log('Client initialized. Listening for messages');

        this.channel.promise.then(() => {
            this.logger.log('Secure parent <-> child channel established');
        });
    }

    protected abstract establishChannel(event: MessageEvent<Message<C>>): void;
    protected abstract getLogger(): Logger;

    send<T = any>(eventType: string, data: T) {
        this.postMessage(MessageType.SEND, eventType, data);
    }

    on<T = any>(eventType: string, handler: EventHandler<T>): () => void {
        if (!this.subscriptions[eventType]) {
            this.subscriptions[eventType] = {};
        }

        const id = randomInsecureId(8);

        this.subscriptions[eventType][id] = handler;

        this.logger.log(`Registered handler for event "${eventType}"`);

        return () => {
            const { [id]: _, ...otherSubscriptions } = this.subscriptions[
                eventType
            ];

            this.subscriptions[eventType] = otherSubscriptions;

            this.logger.log(`Unsubscribed handler for event ${eventType}`);
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
        this.logger.log(
            `Sent message type "${type}", eventType: "${eventType || 'none'}"`
        );
    }

    protected async sanitizeMessage<T = any>(
        event: MessageEvent<any>
    ): Promise<Message<T> | null> {
        const { source } = await this.channel.promise;
        if (event.source !== source) {
            this.logger.error(
                'Message received from non-channel source. Skipping'
            );

            return null;
        }

        const message = event.data;

        if (!message.type || !message.id) {
            this.logger.error('Invalid message format. Skipping');

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

            this.logger.log(
                `Triggered handlers for event type "${message.eventType}"`
            );
        }
    }

    protected messageListener(event: MessageEvent<Message>) {
        switch (event.data.type) {
            case MessageType.CHANNEL_INIT: {
                this.establishChannel(event);
                break;
            }
            case MessageType.SEND: {
                this.handleEvent(event);
            }
        }

        this.logger.log(
            `Received message type "${event.data.type}", eventType: "${
                event.data.eventType || 'none'
            }"`
        );
    }
}
