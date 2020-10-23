import type { MessageType, ProfileEventType, TransactionDirection } from './constants';
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
    requestId?: string;
}
export interface Channel<T = any> {
    source: Window;
    origin: string;
    context: T;
}
export declare type EventHandler<T = any> = (data: T, message: Message<T>) => void;
export declare type RequestHandler<Q = any, R = any> = (requestData: Q) => R;
export interface ProfileEvent {
    type: ProfileEventType;
    date: Date;
    message: Message;
}
export interface TransactionProfile {
    id: string;
    direction: TransactionDirection;
    postTime: Date;
    receiveTime?: Date;
    duration?: number;
    message: Message;
}
