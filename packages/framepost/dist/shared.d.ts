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
    protected subscriptions: {
        [eventType: string]: {
            [id: string]: EventHandler;
        };
    };
    constructor({ debug, profile }?: SharedClientOptions);
    protected abstract establishChannel(event: MessageEvent<Message<C>>): void;
    protected abstract getLogger(): Logger;
    send<T = any>(eventType: string, data: T, requestId?: string): Promise<Message<T>>;
    on<T = any>(eventType: string, handler: EventHandler<T>): () => void;
    request<Q = any, R = any>(requestKey: string, data?: Q): Promise<R>;
    handleRequest<Q = any, R = any>(requestKey: string, requestHandler: RequestHandler<Q, R>): () => void;
    getContext(): Promise<C>;
    destroy(): void;
    protected postMessage<T = any>(type: MessageType, eventType: string, data: T, requestId?: string): Promise<Message<T>>;
    protected isFromValidSource<T = any>(event: MessageEvent<any>): Promise<boolean>;
    protected isValidMessage(event: MessageEvent<any>): boolean;
    protected handleEvent<T = any>(event: MessageEvent<any>): Promise<void>;
    protected messageListener(event: MessageEvent<Message>): void;
}
