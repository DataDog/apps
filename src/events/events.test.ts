import { UiAppEventType } from '../constants';
import { getLogger } from '../logger';
import {
    MockFramePostChildClient,
    mockContext,
    flushPromises
} from '../utils/testUtils';

import { DDEventsClient } from './events';

let mockFramepostClient: MockFramePostChildClient;
let client: DDEventsClient;

beforeEach(() => {
    mockFramepostClient = new MockFramePostChildClient();
    client = new DDEventsClient(
        true,
        getLogger({ debug: true }),
        mockFramepostClient as any
    );
});

describe('events client', () => {
    test('Executes subscribed handlers when corresponding events are sent from the parent', async () => {
        const callback1 = jest.fn();
        const callback2 = jest.fn();

        client.on(UiAppEventType.DASHBOARD_COG_MENU_CONTEXT, callback1);
        client.on(UiAppEventType.DASHBOARD_COG_MENU_CONTEXT, callback2);

        mockFramepostClient.init();

        mockFramepostClient.mockEvent(
            UiAppEventType.DASHBOARD_COG_MENU_CONTEXT,
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

    test('Handles custom events', async () => {
        const callback1 = jest.fn();
        const callback2 = jest.fn();

        client.on('custom_event', callback1);
        client.on('custom_event', callback2);

        mockFramepostClient.init();

        mockFramepostClient.mockEvent('custom_event', {
            id: 'dashboardid',
            shareToken: 'https://www.google.com'
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

        client.on(UiAppEventType.DASHBOARD_COG_MENU_CONTEXT, callback1);
        const unsubscribe = client.on(
            UiAppEventType.DASHBOARD_COG_MENU_CONTEXT,
            callback2
        );

        unsubscribe();

        mockFramepostClient.init();

        mockFramepostClient.mockEvent(
            UiAppEventType.DASHBOARD_COG_MENU_CONTEXT,
            {
                id: 'dashboardid',
                shareToken: 'https://www.google.com'
            }
        );

        await flushPromises();

        expect(callback1).toBeCalled();
        expect(callback2).not.toBeCalled();
    });

    test('Logs an error message in debug mode when attempting to subscribe to an event for which the app does not support the required features', async () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        const errorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        client.on(UiAppEventType.DASHBOARD_COG_MENU_CONTEXT, () => {});

        mockFramepostClient.init({
            ...mockContext,
            features: []
        });

        mockFramepostClient.mockEvent(
            UiAppEventType.DASHBOARD_COG_MENU_CONTEXT,
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
});
