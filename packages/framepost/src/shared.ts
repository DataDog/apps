import {
    MessageType,
    ProfileEventType,
    REQUEST_TIMEOUT,
    MessageAPIVersion
} from './constants';
import { Logger } from './logger';
import { Profiler, getProfiler } from './profiler';
import type {
    Deferred,
    Message,
    Channel,
    EventHandler,
    RequestHandler
} from './types';
import { defer, randomInsecureId, omit } from './utils';

export interface SharedClientOptions {
    debug?: boolean;
    profile?: boolean;
    requestTimeout?: number;
}

export abstract class SharedClient<C> {
    protected readonly debug: boolean;
    protected readonly profile: boolean;
    protected readonly requestTimeout: number;
    protected readonly channel: Deferred<Channel<C>>;
    protected readonly logger: Logger;
    protected readonly profiler: Profiler;
    protected messagePort?: MessagePort;
    protected initTimer?: ReturnType<typeof setTimeout>;
    protected eventSubscriptions: {
        [eventType: string]: { [id: string]: EventHandler };
    };
    protected responseSubscriptions: {
        [id: string]: EventHandler;
    };
    protected requestSubscriptions: {
        [requestKey: string]: RequestHandler;
    };

    constructor({
        debug = false,
        profile = false,
        requestTimeout = REQUEST_TIMEOUT
    }: SharedClientOptions = {}) {
        this.debug = debug;
        this.profile = profile;
        this.requestTimeout = requestTimeout;
        this.channel = defer();
        this.eventSubscriptions = {};
        this.responseSubscriptions = {};
        this.requestSubscriptions = {};

        this.logger = this.getLogger();
        this.profiler = getProfiler(profile);

        this.channel.promise
            .then(() => {
                this.logger.log('Secure parent <-> child channel established');
            })
            .catch((reason: string) => {
                this.logger.log(reason);
            });
    }

    // each client must implement these methods since they will differ slightly
    // in parent and child
    protected abstract onChannelInit(event: MessageEvent<Message<C>>): void;
    protected abstract getLogger(): Logger;
    abstract destroy(): void;

    /**
     * Sends an event to the opposite client
     */
    async send<T = any>(eventType: string, data: T): Promise<Message<T>> {
        return this.postMessage(MessageType.EVENT, eventType, data);
    }

    /**
     * Subscribes an event handler for the given eventType. Returns an unsubscribe hook
     */
    on<T = any>(eventType: string, handler: EventHandler<T>): () => void {
        if (!this.eventSubscriptions[eventType]) {
            this.eventSubscriptions[eventType] = {};
        }

        const id = randomInsecureId(8);

        this.eventSubscriptions[eventType][id] = handler;

        this.logger.log(`Registered handler for event "${eventType}"`);

        return () => {
            this.eventSubscriptions[eventType] = omit(
                this.eventSubscriptions[eventType],
                id
            );

            this.logger.log(`Unsubscribed handler for event ${eventType}`);
        };
    }

    /**
     * Sends a request to the opposite client. There must be an accompanying request handler
     * subscribed with `onRequest`. Resolves with the returned data or times out.
     */
    async request<Q = any, R = any>(requestKey: string, data?: Q): Promise<R> {
        const sentMessage = await this.postMessage(
            MessageType.REQUEST,
            requestKey,
            data
        );

        const unsubscribeResponseHandler = () => {
            this.responseSubscriptions = omit(
                this.responseSubscriptions,
                sentMessage.id
            );
        };

        return new Promise((resolve, reject) => {
            let timer: ReturnType<typeof setTimeout>;

            const responseHandler: EventHandler<R> = (
                response: R,
                message: Message<R>
            ) => {
                clearTimeout(timer);

                unsubscribeResponseHandler();

                resolve(response);
            };

            this.responseSubscriptions[sentMessage.id] = responseHandler;

            timer = setTimeout(() => {
                unsubscribeResponseHandler();
                reject('Request timed out');
            }, this.requestTimeout);
        });
    }

    /**
     * Subscribes a request handler for the given request key. The return value
     * from the subscribed handler is sent back to the opposite client. The handler may be async.
     * Unlike event handlers, there may be only one request handler per request key. Returns
     * an unsubscribe hook.
     */
    onRequest<Q = any, R = any>(
        requestKey: string,
        requestHandler: RequestHandler<Q, R>
    ): () => void {
        const requestEventHandler = async (
            requestData: Q,
            requestMessage: Message<Q>
        ) => {
            const response = await requestHandler(requestData, requestMessage);

            this.postMessage(
                MessageType.RESPONSE,
                requestKey,
                response,
                requestMessage.id
            );
        };

        this.requestSubscriptions[requestKey] = requestEventHandler;

        return () => {
            this.requestSubscriptions = omit(
                this.requestSubscriptions,
                requestKey
            );
        };
    }

    /**
     * Returns the context provided by the opposite client.
     */
    async getContext(): Promise<C> {
        const { context } = await this.channel.promise;
        return context;
    }

    protected async messageListener(ev: MessageEvent<Message>) {
        try {
            await this.channel.promise;
        } catch (e) {
            // if handshake fails, do nothing
        }

        const isValidMessage = this.isValidMessage(ev);

        if (isValidMessage) {
            switch (ev.data.type) {
                case MessageType.EVENT: {
                    this.handleEvent(ev);
                    break;
                }
                case MessageType.REQUEST: {
                    this.handleRequest(ev);
                    break;
                }
                case MessageType.RESPONSE: {
                    this.handleResponse(ev);
                    break;
                }
            }

            this.profiler.logEvent(ProfileEventType.RECEIVE_MESSAGE, ev.data);
        } else {
            this.logger.error('Invalid message format. Skipping.');
        }
    }

    protected handleEvent<T = any>(ev: MessageEvent<Message<T>>) {
        const message = ev.data;

        const subscriptions = this.eventSubscriptions[message.key];

        if (subscriptions) {
            Object.values(subscriptions).forEach(handler =>
                handler(message.data, message)
            );
        }
    }

    protected handleRequest<Q = any>(ev: MessageEvent<Message<Q>>) {
        const message = ev.data;

        const handler = this.requestSubscriptions[message.key];

        if (handler) {
            handler(message.data, message);

            this.logger.log(`Handled request type ${message.key}`);
        }
    }

    protected handleResponse<R = any>(ev: MessageEvent<Message<R>>) {
        const message = ev.data;

        const requestId = message.requestId;

        const handler = requestId && this.responseSubscriptions[requestId];

        if (handler) {
            handler(message.data, message);
        }
    }

    protected async postMessage<T = any>(
        type: MessageType,
        key: string,
        data: T,
        requestId?: string
    ): Promise<Message<T>> {
        const { port } = await this.channel.promise;

        const message: Message = {
            type,
            apiVersion: MessageAPIVersion.v1,
            key,
            data,
            id: randomInsecureId(),
            requestId
        };

        port.postMessage(message);

        this.profiler.logEvent(ProfileEventType.POST_MESSAGE, message);

        return message;
    }

    protected setInitTimer() {
        this.initTimer = setTimeout(() => {
            this.channel.reject('Handshake timed out');
            this.destroy();
        }, this.requestTimeout);
    }

    protected initListener(ev: MessageEvent<Message<C>>) {
        if (this.isInitMessage(ev)) {
            this.profiler.logEvent(ProfileEventType.RECEIVE_MESSAGE, ev.data);

            if (this.initTimer) {
                clearTimeout(this.initTimer);
            }

            this.onChannelInit(ev);

            if (this.messagePort) {
                this.messagePort.onmessage = this.messageListener.bind(this);
            }

            this.resolveChannel(ev);
        } else {
            this.logger.error('Invalid message format. Skipping.');
        }
    }

    protected isValidMessage(ev: MessageEvent<any>): boolean {
        const message = ev.data;

        return (
            message.type &&
            message.id &&
            message.apiVersion === MessageAPIVersion.v1
        );
    }

    protected isInitMessage(ev: MessageEvent<any>): boolean {
        return (
            this.isValidMessage(ev) && ev.data.type === MessageType.CHANNEL_INIT
        );
    }

    protected resolveChannel(ev: MessageEvent<Message<C>>) {
        if (this.messagePort) {
            const channel: Channel<C> = {
                port: this.messagePort,
                origin: ev.origin,
                context: ev.data.data
            };

            this.channel.resolve(channel);
        }
    }

    protected getInitMessage<T = any>(context: T): Message<T> {
        const message: Message<T> = {
            type: MessageType.CHANNEL_INIT,
            apiVersion: MessageAPIVersion.v1,
            key: '',
            data: context,
            id: randomInsecureId()
        };

        return message;
    }
}
