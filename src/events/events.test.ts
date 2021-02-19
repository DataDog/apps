import { UiAppEventType, UiAppRequestType } from '../constants';
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

        eventsClient.on(UiAppEventType.DASHBOARD_COG_MENU_CLICK, callback1);
        eventsClient.on(UiAppEventType.DASHBOARD_COG_MENU_CLICK, callback2);

        mockClient.framePostClient.init();

        mockClient.framePostClient.mockEvent(
            UiAppEventType.DASHBOARD_COG_MENU_CLICK,
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

        eventsClient.on(UiAppEventType.DASHBOARD_COG_MENU_CLICK, callback1);
        const unsubscribe = eventsClient.on(
            UiAppEventType.DASHBOARD_COG_MENU_CLICK,
            callback2
        );

        unsubscribe();

        mockClient.framePostClient.init();

        mockClient.framePostClient.mockEvent(
            UiAppEventType.DASHBOARD_COG_MENU_CLICK,
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

        eventsClient.on(
            UiAppEventType.DASHBOARD_CUSTOM_WIDGET_OPTIONS_CHANGE,
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
            UiAppEventType.DASHBOARD_COG_MENU_CLICK,
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

        eventsClient.onCustom('my_event', callback1);
        eventsClient.onCustom('my_event', callback2);

        mockClient.framePostClient.init();

        mockClient.framePostClient.mockEvent(UiAppEventType.CUSTOM_EVENT, {
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

        eventsClient.onCustom('my_event', callback1);
        eventsClient.onCustom('my_other_event', callback2);

        mockClient.framePostClient.init();

        mockClient.framePostClient.mockEvent(UiAppEventType.CUSTOM_EVENT, {
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
