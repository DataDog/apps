import { UiAppEventType, UiAppRequestType } from '../constants';
import { getLogger } from '../utils/logger';
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

describe('events.on()', () => {
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

        expect(callback1).toHaveBeenCalledWith({
            id: 'dashboardid',
            shareToken: 'https://www.google.com'
        });

        expect(callback2).toHaveBeenCalledWith({
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

        expect(callback1).toHaveBeenCalled();
        expect(callback2).not.toHaveBeenCalled();
    });

    test('Logs an error message in debug mode when attempting to subscribe to an event for which the app does not support the required features', async () => {
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        const errorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        client.on(UiAppEventType.DASHBOARD_COG_MENU_CONTEXT, () => {});

        mockFramepostClient.init({
            ...mockContext,
            appContext: {
                ...mockContext.appContext,
                features: []
            }
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

describe('events.broadcast()', () => {
    test('sends broadcast request to parent', async () => {
        mockFramepostClient.init();
        const requestMock = jest
            .spyOn(mockFramepostClient, 'request')
            .mockImplementation(() => ({
                success: true,
                frameUrls: ['https://domain.com/path/to/frame.html']
            }));

        const response = await client.broadcast('my_event', 'data');

        expect(response).toEqual({
            success: true,
            frameUrls: ['https://domain.com/path/to/frame.html']
        });

        expect(requestMock).toHaveBeenCalledWith(
            UiAppRequestType.EVENT_BROADCAST,
            {
                eventType: 'my_event',
                data: 'data'
            }
        );
    });
});

describe('events.onCustom()', () => {
    test('Handles custom events', async () => {
        const callback1 = jest.fn();
        const callback2 = jest.fn();

        client.onCustom('my_event', callback1);
        client.onCustom('my_event', callback2);

        mockFramepostClient.init();

        mockFramepostClient.mockEvent(UiAppEventType.CUSTOM_EVENT, {
            eventType: 'my_event',
            data: {
                id: 'dashboardid',
                shareToken: 'https://www.google.com'
            }
        });

        await flushPromises();

        expect(callback1).toHaveBeenCalledWith({
            id: 'dashboardid',
            shareToken: 'https://www.google.com'
        });

        expect(callback2).toHaveBeenCalledWith({
            id: 'dashboardid',
            shareToken: 'https://www.google.com'
        });
    });

    test('Filters handlers by custom event type', async () => {
        const callback1 = jest.fn();
        const callback2 = jest.fn();

        client.onCustom('my_event', callback1);
        client.onCustom('my_other_event', callback2);

        mockFramepostClient.init();

        mockFramepostClient.mockEvent(UiAppEventType.CUSTOM_EVENT, {
            eventType: 'my_event',
            data: {
                id: 'dashboardid',
                shareToken: 'https://www.google.com'
            }
        });

        await flushPromises();

        expect(callback1).toHaveBeenCalledWith({
            id: 'dashboardid',
            shareToken: 'https://www.google.com'
        });

        expect(callback2).not.toHaveBeenCalled();
    });
});
