import type {
    MessageType,
    MessageAPIVersion,
    ProfileEventType,
    TransactionDirection,
    SerializationType
} from './constants';

/**
 * A deferred object, including a promise, resolve and reject methods
 */
export interface Deferred<T> {
    resolve: (t: T) => void;
    reject: (e?: any) => void;
    promise: Promise<T>;
}

/**
 * The messgage format that must be adhered to by all data sent with postMessage
 * through the channel
 */
export interface Message<T = any> {
    type: MessageType;
    apiVersion: MessageAPIVersion;
    key: string;
    data: T;
    serialization: SerializationType;
    id: string;
    requestId?: string;
}

/**
 * Represents a shared connection between parent and child, including the
 * opposite window's source window, origin, and the context provided by the
 * opposite client during initialization
 */
export interface Channel<T = any> {
    port: MessagePort;
    origin: string;
    context: T;
}

/**
 * An event handler methods
 */
export type EventHandler<T = any> = (data: T, message: Message<T>) => void;

/**
 * Request handler method. Differs from an eventhandler in that it accepts
 * request data and can return response data
 */
export type RequestHandler<Q = any, R = any> = (
    requestData: Q,
    message: Message<Q>
) => R;

export interface SerializedError {
    name: string;
    message: string;
    stack?: string;
}

/**
 * Profiling metadata about a message
 */
export interface MessageProfileEvent {
    type: ProfileEventType;
    date: Date;
    message: Message;
}

/**
 * Complete, correlated, message profile
 */
export interface MessageProfile {
    id: string;
    direction: TransactionDirection;
    postTime: Date;
    receiveTime?: Date;
    duration?: number;
    message: Message;
}

/**
 * Request options passed to client.request()
 */
export interface RequestOptions {
    timeout?: number;
}
