import type { MessageType } from './constants';

export interface Deferred<T> {
    resolve: (t: T) => void;
    reject: (e?: any) => void;
    promise: Promise<T>;
}

export interface Message<T = any> {
    type: MessageType;
    eventType: string;
    data: T;
    id: string;
}

export interface Channel<T = any> {
    source: Window;
    origin: string;
    context: T;
}

export type EventHandler<T = any> = (data: T) => void;
