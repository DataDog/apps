import { MessageType, ProfileEventType, REQUEST_TIMEOUT } from './constants';
import { Logger } from './logger';
import { Profiler, getProfiler } from './profiler';
import type {
    Deferred,
    Message,
    Channel,
    EventHandler,
    RequestHandler
} from './types';
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
    protected readonly profiler: Profiler;
    protected subscriptions: {
        [eventType: string]: { [id: string]: EventHandler };
    };

    constructor({ debug = false, profile = false }: SharedClientOptions = {}) {
        this.debug = debug;
        this.profile = profile;
        this.channel = defer();
        this.subscriptions = {};

        this.logger = this.getLogger();
        this.profiler = getProfiler(profile);

        this.messageListener = this.messageListener.bind(this);
        window.addEventListener('message', this.messageListener);

        this.logger.log('Client initialized. Listening for messages');

        this.channel.promise.then(() => {
            this.logger.log('Secure parent <-> child channel established');
        });
    }

    protected abstract establishChannel(event: MessageEvent<Message<C>>): void;
    protected abstract getLogger(): Logger;

    async send<T = any>(
        eventType: string,
        data: T,
        requestId?: string
    ): Promise<Message<T>> {
        return this.postMessage(MessageType.SEND, eventType, data, requestId);
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

    async request<Q = any, R = any>(requestKey: string, data?: Q): Promise<R> {
        const sentMessage = await this.send(requestKey, data);

        return new Promise((resolve, reject) => {
            let timer: ReturnType<typeof setTimeout>;

            const tmpEventHandler = (response: R, message: Message<R>) => {
                if (message.requestId === sentMessage.id) {
                    clearTimeout(timer);

                    resolve(response);
                }
            };

            const unsubscribe = this.on(requestKey, tmpEventHandler);

            timer = setTimeout(() => {
                unsubscribe();
                reject('Request timed out');
            }, REQUEST_TIMEOUT);
        });
    }

    handleRequest<Q = any, R = any>(
        requestKey: string,
        requestHandler: RequestHandler<Q, R>
    ): () => void {
        const eventHandler = async (
            requestData: Q,
            requestMessage: Message<Q>
        ) => {
            const response = await requestHandler(requestData);

            this.send(requestKey, response, requestMessage.id);
        };

        return this.on(requestKey, eventHandler);
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
        data: T,
        requestId?: string
    ): Promise<Message<T>> {
        const { source, origin } = await this.channel.promise;

        const message: Message = {
            type,
            eventType,
            data,
            id: randomInsecureId(),
            requestId
        };

        source.postMessage(message, origin);

        this.logger.log(
            `Sent message type "${type}", eventType: "${eventType || 'none'}"`
        );

        this.profiler.logEvent(ProfileEventType.POST_MESSAGE, message);

        return message;
    }

    protected async isFromValidSource<T = any>(
        event: MessageEvent<any>
    ): Promise<boolean> {
        const { source } = await this.channel.promise;

        return event.source === source;
    }

    protected isValidMessage(event: MessageEvent<any>): boolean {
        const message = event.data;

        return message.type && message.id;
    }

    protected async handleEvent<T = any>(event: MessageEvent<any>) {
        const valid = await this.isFromValidSource<T>(event);
        if (valid) {
            const message = event.data as Message<T>;

            const subscriptions = this.subscriptions[message.eventType] || {};

            Object.values(subscriptions).forEach(handler =>
                handler(message.data, message)
            );

            this.logger.log(
                `Triggered handlers for event type "${message.eventType}"`
            );
        }
    }

    protected messageListener(event: MessageEvent<Message>) {
        if (!this.isValidMessage(event)) {
            this.logger.error('Invalid message format. Skipping');

            return;
        }

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

        this.profiler.logEvent(ProfileEventType.RECEIVE_MESSAGE, event.data);
    }
}
