import { MessageType } from './constants';
import { Logger } from './logger';
import { Profiler } from './profiler';
import type { Deferred, Message, Channel, EventHandler, RequestHandler } from './types';
export interface SharedClientOptions {
    debug?: boolean;
    profile?: boolean;
}
export declare abstract class SharedClient<C> {
    protected readonly debug: boolean;
    protected readonly profile: boolean;
    protected readonly channel: Deferred<Channel<C>>;
    protected readonly logger: Logger;
    protected readonly profiler: Profiler;
    protected eventSubscriptions: {
        [eventType: string]: {
            [id: string]: EventHandler;
        };
    };
    protected responseSubscriptions: {
        [id: string]: EventHandler;
    };
    protected requestSubscriptions: {
        [requestKey: string]: RequestHandler;
    };
    constructor({ debug, profile }?: SharedClientOptions);
    protected abstract establishChannel(event: MessageEvent<Message<C>>): void;
    protected abstract getLogger(): Logger;
    /**
     * Sends an event to the opposite client
     */
    send<T = any>(eventType: string, data: T): Promise<Message<T>>;
    /**
     * Subscribes an event handler for the given eventType. Returns an unsubscribe hook
     */
    on<T = any>(eventType: string, handler: EventHandler<T>): () => void;
    /**
     * Sends a request to the opposite client. There must be an accompanying request handler
     * subscribed with `onRequest`. Resolves with the returned data or times out.
     */
    request<Q = any, R = any>(requestKey: string, data?: Q): Promise<R>;
    /**
     * Subscribes a request handler for the given request key. The return value
     * from the subscribed handler is sent back to the opposite client. The handler may be async.
     * Unlike event handlers, there may be only one request handler per request key. Returns
     * an unsubscribe hook.
     */
    onRequest<Q = any, R = any>(requestKey: string, requestHandler: RequestHandler<Q, R>): () => void;
    /**
     * Returns the context provided by the opposite client.
     */
    getContext(): Promise<C>;
    /**
     * Detaches message listener
     */
    destroy(): void;
    protected messageListener(ev: MessageEvent<Message>): Promise<void>;
    protected handleEvent<T = any>(ev: MessageEvent<Message<T>>): void;
    protected handleRequest<Q = any>(ev: MessageEvent<Message<Q>>): void;
    protected handleResponse<R = any>(ev: MessageEvent<Message<R>>): void;
    protected postMessage<T = any>(type: MessageType, key: string, data: T, requestId?: string): Promise<Message<T>>;
    protected isFromSource(ev: MessageEvent<any>): Promise<boolean>;
    protected isValidMessage(ev: MessageEvent<any>): boolean;
}
