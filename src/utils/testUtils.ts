import { UiAppFeatureType } from '../constants';
import { AppContext } from '../types';

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

export const mockContext: AppContext = {
    name: 'User',
    handle: 'user@email.com',
    organization: {
        id: 'id',
        name: 'Corporate overlord'
    },
    features: [UiAppFeatureType.DASHBOARD_COG_MENU]
};

export class MockFramePostChildClient {
    context: Deferred<any>;
    subscriptions: { [ev: string]: { [od: string]: (data?: any) => any } };
    sendCallBack?: jest.Mock;

    constructor() {
        this.context = defer();
        this.subscriptions = {};
    }

    init(override?: any, sendCallBack?: jest.Mock) {
        this.context.resolve(override || mockContext);
        this.sendCallBack = sendCallBack;
    }

    async getContext() {
        const context = await this.context.promise;

        return context;
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
}

export const flushPromises = () => new Promise(setImmediate);
