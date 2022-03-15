import { EventType, RequestType } from '../constants';
import { MockClient, mockContext, flushPromises } from '../utils/testUtils';

import { DDEventsClient } from './events';

let mockClient: MockClient;
let eventsClient: DDEventsClient;

beforeEach(() => {
    mockClient = new MockClient();
    eventsClient = new DDEventsClient(mockClient as any);
});

describe('events.on()', () => {
    test('Executes subscribed handlers when corresponding events are sent from the parent', async () => {
        const callback1 = jest.fn();
        const callback2 = jest.fn();

        eventsClient.on(EventType.DASHBOARD_COG_MENU_CLICK, callback1);
        eventsClient.on(EventType.DASHBOARD_COG_MENU_CLICK, callback2);

        mockClient.framePostClient.init();

        mockClient.framePostClient.mockEvent(
            EventType.DASHBOARD_COG_MENU_CLICK,
            {
                id: 'dashboardid',
                shareURL: 'https://www.google.com'
            }
        );

        await flushPromises();

        expect(callback1).toHaveBeenCalledWith({
            id: 'dashboardid',
            shareURL: 'https://www.google.com'
        });

        expect(callback2).toHaveBeenCalledWith({
            id: 'dashboardid',
            shareURL: 'https://www.google.com'
        });
    });

    test('Unsubscribes handlers if unsubscribe hook is executed', async () => {
        const callback1 = jest.fn();
        const callback2 = jest.fn();

        eventsClient.on(EventType.DASHBOARD_COG_MENU_CLICK, callback1);
        const unsubscribe = eventsClient.on(
            EventType.DASHBOARD_COG_MENU_CLICK,
            callback2
        );

        unsubscribe();

        mockClient.framePostClient.init();

        mockClient.framePostClient.mockEvent(
            EventType.DASHBOARD_COG_MENU_CLICK,
            {
                id: 'dashboardid',
                shareURL: 'https://www.google.com'
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

        eventsClient.on(
            EventType.DASHBOARD_CUSTOM_WIDGET_OPTIONS_CHANGE,
            () => {}
        );

        mockClient.framePostClient.init({
            ...mockContext,
            app: {
                ...mockContext.app,
                features: []
            }
        });

        mockClient.framePostClient.mockEvent(
            EventType.DASHBOARD_COG_MENU_CLICK,
            {
                id: 'dashboardid',
                shareURL: 'https://www.google.com'
            }
        );

        await flushPromises();

        expect(errorSpy).toHaveBeenCalled();

        logSpy.mockRestore();
        errorSpy.mockRestore();
    });

    test('Logs a warning in debug mode when attempting to subscribe to a deprecated event', async () => {
        const warnSpy = jest
            .spyOn(console, 'warn')
            .mockImplementation(() => {});

        eventsClient.on(EventType.DASHBOARD_TIMEFRAME_CHANGE, () => {});
        eventsClient.on(EventType.DASHBOARD_TEMPLATE_VAR_CHANGE, () => {});

        mockClient.framePostClient.init();

        await flushPromises();

        expect(warnSpy).toHaveBeenCalledTimes(2);
    });
});

describe('events.broadcast()', () => {
    test('sends broadcast request to parent', async () => {
        mockClient.framePostClient.init();
        const requestMock = jest
            .spyOn(mockClient.framePostClient, 'request')
            .mockImplementation(() => ({
                success: true,
                frameUrls: ['https://domain.com/path/to/frame.html']
            }));

        const response = await eventsClient.broadcast('my_event', 'data');

        expect(response).toEqual({
            success: true,
            frameUrls: ['https://domain.com/path/to/frame.html']
        });

        expect(requestMock).toHaveBeenCalledWith(RequestType.EVENT_BROADCAST, {
            eventType: 'my_event',
            data: 'data'
        });
    });
});

describe('events.onCustom()', () => {
    test('Handles custom events', async () => {
        const callback1 = jest.fn();
        const callback2 = jest.fn();

        eventsClient.onCustom('my_event', callback1);
        eventsClient.onCustom('my_event', callback2);

        mockClient.framePostClient.init();

        mockClient.framePostClient.mockEvent(EventType.CUSTOM_EVENT, {
            eventType: 'my_event',
            data: {
                id: 'dashboardid',
                shareURL: 'https://www.google.com'
            }
        });

        await flushPromises();

        expect(callback1).toHaveBeenCalledWith({
            id: 'dashboardid',
            shareURL: 'https://www.google.com'
        });

        expect(callback2).toHaveBeenCalledWith({
            id: 'dashboardid',
            shareURL: 'https://www.google.com'
        });
    });

    test('Filters handlers by custom event type', async () => {
        const callback1 = jest.fn();
        const callback2 = jest.fn();

        eventsClient.onCustom('my_event', callback1);
        eventsClient.onCustom('my_other_event', callback2);

        mockClient.framePostClient.init();

        mockClient.framePostClient.mockEvent(EventType.CUSTOM_EVENT, {
            eventType: 'my_event',
            data: {
                id: 'dashboardid',
                shareURL: 'https://www.google.com'
            }
        });

        await flushPromises();

        expect(callback1).toHaveBeenCalledWith({
            id: 'dashboardid',
            shareURL: 'https://www.google.com'
        });

        expect(callback2).not.toHaveBeenCalled();
    });
});
