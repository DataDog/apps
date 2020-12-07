import { init } from '.';

import { DDClient } from './client';
import {
    UiAppEventToSubscribeType,
    UiAppFeatureType,
    UiAppEventToTriggerType
} from './constants';
import { Context } from './types';
import { defer, Deferred, uniqueInt } from './utils';

const mockContext: Context = {
    appContext: {
        name: 'User',
        handle: 'user@email.com',
        organization: {
            id: 'id',
            name: 'Corporate overlord'
        },
        features: [UiAppFeatureType.DASHBOARD_COG_MENU]
    }
};

class MockFramePostChildClient {
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

const flushPromises = () => new Promise(setImmediate);

let mockClient: MockFramePostChildClient;

jest.mock('@datadog/framepost', () => ({
    ChildClient: class {
        constructor() {
            return mockClient;
        }
    }
}));

beforeEach(() => {
    mockClient = new MockFramePostChildClient();
});

describe('client', () => {
    test('instantiates without error', () => {
        const client = new DDClient();

        expect(client).toBeInstanceOf(Object);
    });

    test('has a getContext() method that returns app context after it is supplied from parent', async () => {
        const client = new DDClient();

        mockClient.init();

        const context = await client.getContext();

        expect(context).toBe(mockContext);
    });

    test('logs an error in debug mode if the consumer tries to subscribe to an invalid event', async () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        const errorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const client = new DDClient({ debug: true });

        client.on('invalid_event_blah' as UiAppEventToSubscribeType, () => {});

        expect(errorSpy).toHaveBeenCalled();

        await flushPromises();

        logSpy.mockRestore();
        errorSpy.mockRestore();
    });

    test('Executes subscribed handlers when corresponding events are sent from the parent', async () => {
        const callback1 = jest.fn();
        const callback2 = jest.fn();

        const client = new DDClient();

        client.on(
            UiAppEventToSubscribeType.DASHBOARD_COG_MENU_CONTEXT,
            callback1
        );
        client.on(
            UiAppEventToSubscribeType.DASHBOARD_COG_MENU_CONTEXT,
            callback2
        );

        mockClient.init();

        mockClient.mockEvent(
            UiAppEventToSubscribeType.DASHBOARD_COG_MENU_CONTEXT,
            {
                id: 'dashboardid',
                shareToken: 'https://www.google.com'
            }
        );

        await flushPromises();

        expect(callback1).toBeCalledWith({
            id: 'dashboardid',
            shareToken: 'https://www.google.com'
        });

        expect(callback2).toBeCalledWith({
            id: 'dashboardid',
            shareToken: 'https://www.google.com'
        });
    });

    test('Unsubscribes handlers if unsubscribe hook is executed', async () => {
        const callback1 = jest.fn();
        const callback2 = jest.fn();

        const client = new DDClient();

        client.on(
            UiAppEventToSubscribeType.DASHBOARD_COG_MENU_CONTEXT,
            callback1
        );
        const unsubscribe = client.on(
            UiAppEventToSubscribeType.DASHBOARD_COG_MENU_CONTEXT,
            callback2
        );

        unsubscribe();

        mockClient.init();

        mockClient.mockEvent(
            UiAppEventToSubscribeType.DASHBOARD_COG_MENU_CONTEXT,
            {
                id: 'dashboardid',
                shareToken: 'https://www.google.com'
            }
        );

        await flushPromises();

        expect(callback1).toBeCalled();
        expect(callback2).not.toBeCalled();
    });

    test('Does not execute suscribed handlers if the app context does not include the relevant feature', async () => {
        const callback1 = jest.fn();
        const callback2 = jest.fn();

        const client = new DDClient();

        client.on(
            UiAppEventToSubscribeType.DASHBOARD_COG_MENU_CONTEXT,
            callback1
        );
        client.on(
            UiAppEventToSubscribeType.DASHBOARD_COG_MENU_CONTEXT,
            callback2
        );

        mockClient.init({
            ...mockContext,
            features: []
        });

        mockClient.mockEvent(
            UiAppEventToSubscribeType.DASHBOARD_COG_MENU_CONTEXT,
            {
                id: 'dashboardid',
                shareToken: 'https://www.google.com'
            }
        );

        await flushPromises();

        expect(callback1).not.toBeCalled();
        expect(callback2).not.toBeCalled();
    });

    test('Logs an error message in debug mode when a subscription handler is not executed because of failed feature check', async () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        const errorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const client = new DDClient({ debug: true });

        client.on(
            UiAppEventToSubscribeType.DASHBOARD_COG_MENU_CONTEXT,
            () => {}
        );

        mockClient.init({
            ...mockContext,
            features: []
        });

        mockClient.mockEvent(
            UiAppEventToSubscribeType.DASHBOARD_COG_MENU_CONTEXT,
            {
                id: 'dashboardid',
                shareToken: 'https://www.google.com'
            }
        );

        await flushPromises();

        expect(errorSpy).toHaveBeenCalled();

        logSpy.mockRestore();
        errorSpy.mockRestore();
    });

    // test('Has an on method that resolves with the app context data provided to the init method', () => {});

    test('logs an error in debug mode if the consumer tries to trigger an invalid event', async () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        const errorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const client = new DDClient({ debug: true });

        client.triggerEvent('invalid_event' as UiAppEventToTriggerType);

        expect(errorSpy).toHaveBeenCalled();

        await flushPromises();

        logSpy.mockRestore();
        errorSpy.mockRestore();
    });

    test('Triggers a valid event if the corresponding feature is enabled ', async () => {
        const client = new DDClient();

        const callback = jest.fn();
        mockClient.init(
            {
                ...mockContext,
                features: [UiAppFeatureType.APP_ROUTING]
            },
            callback
        );

        client.triggerEvent(UiAppEventToTriggerType.OPEN_URL, {
            url: 'https://www.google.com'
        });

        await flushPromises();

        expect(callback).toBeCalledWith(UiAppEventToTriggerType.OPEN_URL, {
            url: 'https://www.google.com'
        });
    });

    test('Does not trigger an event if the app context does not include the relevant feature and logs an error in debug mode', async () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        const errorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const client = new DDClient({ debug: true });

        const callback = jest.fn();
        mockClient.init(
            {
                ...mockContext,
                features: []
            },
            callback
        );

        client.triggerEvent(UiAppEventToTriggerType.OPEN_URL, {
            url: 'https://www.google.com'
        });

        await flushPromises();

        expect(callback).not.toBeCalled();

        expect(errorSpy).toHaveBeenCalled();

        logSpy.mockRestore();
        errorSpy.mockRestore();
    });
});

describe('sdk init method', () => {
    test('returns a client instance', () => {
        const client = init();

        expect(client).toBeInstanceOf(DDClient);
    });

    test('does not re-instantiate client if called again', () => {
        const client = init();

        const clientAgain = init();

        expect(clientAgain).toBe(client);
    });
});
