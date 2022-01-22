import { ColorTheme, EventType, FeatureType, RequestType } from '../constants';
import {
    Context,
    ContextClient,
    DebugClient,
    EventClient,
    EventHandler,
    LoggerClient,
    RequestClient,
    RequestHandler
} from '../types';

import { Logger } from './logger';

export interface Deferred<T> {
    resolve: (t: T) => void;
    reject: (t: T) => void;
    promise: Promise<T>;
}

/**
 * Creates a defferred object, including promise and resolve + reject methods to be executed later
 */
export const defer = <T>(): Deferred<T> => {
    let resolve: (t: T) => void = () => {};
    let reject: (t: T) => void = () => {};
    const promise = new Promise<T>((res, rej) => {
        resolve = res;
        reject = rej;
    });

    return {
        resolve,
        reject,
        promise
    };
};

let increment: number = 0;

// generates an integer, guaranteed to be unique becuase it's incremented :)
export const uniqueInt = (): number => {
    increment++;

    return increment;
};

export const mockContext: Context = {
    app: {
        currentUser: {
            timeZone: 'America/New_York',
            colorTheme: ColorTheme.light
        },
        features: [FeatureType.DASHBOARD_COG_MENU],
        debug: true
    }
};

export class MockFramePostChildClient {
    context: Deferred<any>;
    subscriptions: { [ev: string]: { [od: string]: (data?: any) => any } };
    requestSubscriptions: {
        [reqKey: string]: (data?: any) => any;
    };
    sendCallBack?: jest.Mock;

    constructor() {
        this.context = defer();
        this.subscriptions = {};
        this.requestSubscriptions = {};
    }

    init(override?: any, sendCallBack?: jest.Mock) {
        this.context.resolve(override || mockContext);
        this.sendCallBack = sendCallBack;
    }

    async getContext() {
        const context = await this.context.promise;

        return context;
    }

    handshake() {
        return this.getContext();
    }

    on(eventType: string, handler: (arg?: any) => any): () => void {
        const subscriptionId = uniqueInt().toString();

        if (!this.subscriptions[eventType]) {
            this.subscriptions[eventType] = {};
        }

        this.subscriptions[eventType][subscriptionId] = handler;

        return () => {
            const {
                [subscriptionId]: _,
                ...otherSubscriptions
            } = this.subscriptions[eventType];

            this.subscriptions[eventType] = otherSubscriptions;
        };
    }

    send(eventType: string, data: any) {
        if (this.sendCallBack) {
            this.sendCallBack(eventType, data);
        }
    }

    mockEvent(eventType: string, data: any) {
        const subscriptions = this.subscriptions[eventType] || {};

        Object.values(subscriptions).forEach(subscription =>
            subscription(data)
        );
    }

    request(eventType: string, data: any): any {}

    onRequest(requestKey: string, requestHandler: (arg?: any) => any) {
        this.requestSubscriptions[requestKey] = requestHandler;
        return () => delete this.requestSubscriptions[requestKey];
    }

    mockRequest(requestKey: string, data?: any) {
        const handler = this.requestSubscriptions[requestKey];
        if (handler) {
            return handler(data);
        }
    }
}

export const flushPromises = () => new Promise(setImmediate);

export class MockLocalStorage {
    store: {
        [key: string]: string;
    };
    length: number;
    constructor() {
        this.store = {};
        this.length = 0;
    }
    clear() {
        this.store = {};
        this.length = 0;
    }

    getItem(key: string): string | null {
        return this.store[key] || null;
    }

    setItem(key: string, value: string): void {
        this.store[key] = String(value);
        this.length = Object.keys(this.store).length;
    }

    removeItem(key: string): void {
        delete this.store[key];
        this.length = Object.keys(this.store).length;
    }

    key(index: number): string | null {
        return Object.keys(this.store)[index];
    }
}

export class MockClient
    implements
        ContextClient,
        DebugClient,
        EventClient,
        LoggerClient,
        RequestClient {
    framePostClient: MockFramePostChildClient;
    logger: Logger;
    debug: boolean = true;

    constructor() {
        this.framePostClient = new MockFramePostChildClient();
        this.logger = new Logger(this as any);
    }

    getContext() {
        return this.framePostClient.getContext();
    }

    log(message: string): void {
        return this.logger.log(message);
    }

    logError(message: string): void {
        return this.logger.error(message);
    }

    on<T = unknown>(
        eventType: EventType,
        eventHandler: EventHandler<T>
    ): () => void {
        return this.framePostClient.on(eventType, eventHandler);
    }

    onRequest<Q = unknown, R = unknown>(
        requestType: RequestType,
        requestHandler: RequestHandler<Q, R>
    ): () => void {
        return this.framePostClient.onRequest(requestType, requestHandler);
    }

    request<Q = unknown, R = unknown>(
        requestType: RequestType,
        requestData?: Q
    ): Promise<R> {
        return this.framePostClient.request(requestType, requestData);
    }

    async send<T = unknown>(eventType: EventType, eventData: T): Promise<void> {
        this.framePostClient.send(eventType, eventData);
    }
}
