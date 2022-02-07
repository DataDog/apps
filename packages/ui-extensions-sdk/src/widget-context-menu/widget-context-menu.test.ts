import { FeatureType, RequestType, MenuItemType } from '../constants';
import { mockContext, MockClient } from '../utils/testUtils';

import { DDWidgetContextMenuClient } from './widget-context-menu';

let client: MockClient;
let widgetContextMenuClient: DDWidgetContextMenuClient;

beforeEach(() => {
    client = new MockClient();
    widgetContextMenuClient = new DDWidgetContextMenuClient(client as any);
});

describe('dashboardContextMenu.onRequestItems()', () => {
    test('throws an error if `WIDGET_CONTEXT_MENU` is not enabled', async () => {
        client.framePostClient.init({
            ...mockContext,
            app: {
                ...mockContext.app,
                features: []
            }
        });

        const response = client.framePostClient.mockRequest(
            RequestType.GET_WIDGET_CONTEXT_MENU_ITEMS,
            'data'
        );

        await expect(response).rejects.toBeInstanceOf(Error);
    });

    test('Registers a handler returning an empty array on init', async () => {
        client.framePostClient.init({
            ...mockContext,
            app: {
                ...mockContext.app,
                features: [FeatureType.WIDGET_CONTEXT_MENU]
            }
        });

        const response = await client.framePostClient.mockRequest(
            RequestType.GET_WIDGET_CONTEXT_MENU_ITEMS,
            'data'
        );

        expect(response.items).toEqual([]);
    });

    test('registers the provided handler when onRequestItems is called', async () => {
        client.framePostClient.init({
            ...mockContext,
            app: {
                ...mockContext.app,
                features: [FeatureType.WIDGET_CONTEXT_MENU]
            }
        });

        const handler = jest.fn((data: any) => {
            return {
                items: [
                    {
                        key: 'item-a',
                        label: 'Label A',
                        actionType: MenuItemType.LINK,
                        href: 'https://google.com'
                    }
                ]
            };
        });

        widgetContextMenuClient.onRequest(handler);

        const response = await client.framePostClient.mockRequest(
            RequestType.GET_WIDGET_CONTEXT_MENU_ITEMS,
            'data'
        );

        expect(handler).toHaveBeenLastCalledWith('data');

        expect(response.items).toEqual([
            {
                key: 'item-a',
                label: 'Label A',
                actionType: MenuItemType.LINK,
                href: 'https://google.com'
            }
        ]);
    });

    test('logs an error and excludes item if `.key` is not provided', async () => {
        const errorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        client.framePostClient.init({
            ...mockContext,
            app: {
                ...mockContext.app,
                features: [FeatureType.WIDGET_CONTEXT_MENU]
            }
        });

        const handler = jest.fn((data: any) => {
            return {
                items: [
                    {
                        label: 'Label A',
                        acctionType: MenuItemType.LINK,
                        href: 'https://google.com'
                    }
                ]
            };
        });

        // @ts-ignore
        widgetContextMenuClient.onRequest(handler);

        const response = await client.framePostClient.mockRequest(
            RequestType.GET_WIDGET_CONTEXT_MENU_ITEMS,
            'data'
        );

        expect(handler).toHaveBeenLastCalledWith('data');

        expect(response.items).toEqual([]);

        expect(errorSpy).toHaveBeenCalled();

        errorSpy.mockRestore();
    });

    test('returns an unsubscribe hook that replaces with an empty handler', async () => {
        client.framePostClient.init({
            ...mockContext,
            app: {
                ...mockContext.app,
                features: [FeatureType.WIDGET_CONTEXT_MENU]
            }
        });

        const handler = jest.fn((data: any) => {
            return {
                items: [
                    {
                        key: 'item-a',
                        label: 'Label A',
                        actionType: MenuItemType.LINK,
                        href: 'https://google.com'
                    }
                ]
            };
        });

        const unsubscribe = widgetContextMenuClient.onRequest(handler);

        unsubscribe();

        const response = await client.framePostClient.mockRequest(
            RequestType.GET_WIDGET_CONTEXT_MENU_ITEMS,
            'data'
        );

        expect(response.items).toEqual([]);
    });
});
