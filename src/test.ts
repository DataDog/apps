import { init } from '.';

import { DDClient } from './client';
import { UiAppEventType, UiAppCapabilityType } from './constants';
import { AppContext } from './types';

class MockParent {
    model: any;

    setModel(model: any) {
        this.model = model;
    }

    call(name: string, data: any) {
        this.model[name](data);
    }
}

const parent = new MockParent();

jest.mock('postmate', () => ({
    Model: jest.fn(async m => {
        parent.setModel(m);

        return Promise.resolve();
    })
}));

const mockContext: AppContext = {
    name: 'User',
    handle: 'user@email.com',
    organization: {
        id: 'id',
        name: 'Corporate overlord'
    },
    capabilities: [UiAppCapabilityType.DASHBOARD_COG_MENU]
};

const flushPromises = () => new Promise(setImmediate);

describe('client', () => {
    test('instantiates without error', () => {
        const client = new DDClient();

        expect(client).toBeInstanceOf(Object);
    });

    test('has a getContext() method that returns app context after it is supplied from parent', async () => {
        const client = new DDClient();

        parent.call('init', mockContext);

        const context = await client.getContext();

        expect(context).toBe(mockContext);
    });

    test('logs an error in debug mode if the consumer tries to subscribe to an invalid event', async () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        const errorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const client = new DDClient({ debug: true });

        client.on('invalid_event_blah' as UiAppEventType, () => {});

        expect(errorSpy).toHaveBeenCalled();

        await flushPromises();

        logSpy.mockRestore();
        errorSpy.mockRestore();
    });

    test('logs an error in debug mode if the parent sends an invalid event type', async () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        const errorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const client = new DDClient({ debug: true }); // eslint-disable-line

        parent.call('init', mockContext);

        parent.call('handleEvent', {
            eventType: 'bad_event_type_blah',
            data: {
                id: 'dashboardid',
                shareToken: 'https://www.google.com'
            }
        });

        expect(errorSpy).toHaveBeenCalled();

        await flushPromises();

        logSpy.mockRestore();
        errorSpy.mockRestore();
    });

    test('Executes subscribed handlers when corresponding events are sent from the parent', async () => {
        const callback1 = jest.fn();
        const callback2 = jest.fn();

        const client = new DDClient();

        client.on(UiAppEventType.DASHBOARD_COG_MENU_CONTEXT, callback1);
        client.on(UiAppEventType.DASHBOARD_COG_MENU_CONTEXT, callback2);

        parent.call('init', mockContext);

        parent.call('handleEvent', {
            eventType: UiAppEventType.DASHBOARD_COG_MENU_CONTEXT,
            data: {
                id: 'dashboardid',
                shareToken: 'https://www.google.com'
            }
        });

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

        client.on(UiAppEventType.DASHBOARD_COG_MENU_CONTEXT, callback1);
        const unsubscribe = client.on(
            UiAppEventType.DASHBOARD_COG_MENU_CONTEXT,
            callback2
        );

        unsubscribe();

        parent.call('init', mockContext);

        parent.call('handleEvent', {
            eventType: UiAppEventType.DASHBOARD_COG_MENU_CONTEXT,
            data: {
                id: 'dashboardid',
                shareToken: 'https://www.google.com'
            }
        });

        await flushPromises();

        expect(callback1).toBeCalled();
        expect(callback2).not.toBeCalled();
    });

    test('Does not execute suscribed handlers if the app context does not include the relevant capability', async () => {
        const callback1 = jest.fn();
        const callback2 = jest.fn();

        const client = new DDClient();

        client.on(UiAppEventType.DASHBOARD_COG_MENU_CONTEXT, callback1);
        client.on(UiAppEventType.DASHBOARD_COG_MENU_CONTEXT, callback2);

        parent.call('init', {
            ...mockContext,
            capabilities: []
        });

        parent.call('handleEvent', {
            eventType: UiAppEventType.DASHBOARD_COG_MENU_CONTEXT,
            data: {
                id: 'dashboardid',
                shareToken: 'https://www.google.com'
            }
        });

        await flushPromises();

        expect(callback1).not.toBeCalled();
        expect(callback2).not.toBeCalled();
    });

    test('Logs an error message in debug mode when a subscription handler is not executed because of failed capability check', async () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        const errorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const client = new DDClient({ debug: true });

        client.on(UiAppEventType.DASHBOARD_COG_MENU_CONTEXT, () => {});

        parent.call('init', {
            ...mockContext,
            capabilities: []
        });

        parent.call('handleEvent', {
            eventType: UiAppEventType.DASHBOARD_COG_MENU_CONTEXT,
            data: {
                id: 'dashboardid',
                shareToken: 'https://www.google.com'
            }
        });

        await flushPromises();

        expect(errorSpy).toHaveBeenCalled();

        logSpy.mockRestore();
        errorSpy.mockRestore();
    });

    // test('Has an on method that resolves with the app context data provided to the init method', () => {});
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

    // test will time out
    test('executes callback after context is supplied', async () => {
        const callback = jest.fn();

        init({}, callback);

        parent.call('init', mockContext);

        await flushPromises();

        expect(callback).toBeCalledWith(mockContext);
    });

    test('executes new callback if called again', async () => {
        const callback = jest.fn();

        init();

        await flushPromises();

        init({}, callback);

        await flushPromises();

        expect(callback).toBeCalledWith(mockContext);
    });
});
