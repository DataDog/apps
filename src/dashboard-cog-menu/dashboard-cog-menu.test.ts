import { UiAppFeatureType, UiAppRequestType, MenuItemType } from '../constants';
import { getLogger } from '../utils/logger';
import { MockFramePostChildClient, mockContext } from '../utils/testUtils';

import { DDDashboardCogMenuClient } from './dashboard-cog-menu';

let mockFramepostClient: MockFramePostChildClient;
let client: DDDashboardCogMenuClient;

beforeEach(() => {
    mockFramepostClient = new MockFramePostChildClient();
    client = new DDDashboardCogMenuClient(
        true,
        getLogger({ debug: true }),
        mockFramepostClient as any
    );
});

describe('dashboardContextMenu.onRequestItems()', () => {
    test('Registers a handler returning an empty array on init', async () => {
        mockFramepostClient.init({
            ...mockContext,
            app: {
                ...mockContext.app,
                features: [UiAppFeatureType.DASHBOARD_COG_MENU]
            }
        });

        const response = await mockFramepostClient.mockRequest(
            UiAppRequestType.GET_DASHBOARD_COG_MENU_ITEMS,
            'data'
        );

        expect(response.items).toEqual([]);
    });

    test('registers the provided handler when onRequestItems is called', async () => {
        mockFramepostClient.init({
            ...mockContext,
            app: {
                ...mockContext.app,
                features: [UiAppFeatureType.DASHBOARD_COG_MENU]
            }
        });

        const handler = jest.fn((data: any) => {
            return {
                items: [
                    {
                        key: 'item-a',
                        label: 'Label A',
                        type: MenuItemType.LINK,
                        href: 'https://google.com'
                    }
                ]
            };
        });

        client.onRequest(handler);

        const response = await mockFramepostClient.mockRequest(
            UiAppRequestType.GET_DASHBOARD_COG_MENU_ITEMS,
            'data'
        );

        expect(handler).toHaveBeenLastCalledWith('data');

        expect(response.items).toEqual([
            {
                key: 'item-a',
                label: 'Label A',
                type: MenuItemType.LINK,
                href: 'https://google.com'
            }
        ]);
    });

    test('logs an error and excludes item if `.key` is not provided', async () => {
        const errorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        mockFramepostClient.init({
            ...mockContext,
            app: {
                ...mockContext.app,
                features: [UiAppFeatureType.DASHBOARD_COG_MENU]
            }
        });

        const handler = jest.fn((data: any) => {
            return {
                items: [
                    {
                        label: 'Label A',
                        type: MenuItemType.LINK,
                        href: 'https://google.com'
                    }
                ]
            };
        });

        // @ts-ignore
        client.onRequest(handler);

        const response = await mockFramepostClient.mockRequest(
            UiAppRequestType.GET_DASHBOARD_COG_MENU_ITEMS,
            'data'
        );

        expect(handler).toHaveBeenLastCalledWith('data');

        expect(response.items).toEqual([]);

        expect(errorSpy).toHaveBeenCalled();

        errorSpy.mockRestore();
    });

    test('returns an unsubscribe hook that replaces with an empty handler', async () => {
        mockFramepostClient.init({
            ...mockContext,
            app: {
                ...mockContext.app,
                features: [UiAppFeatureType.DASHBOARD_COG_MENU]
            }
        });

        const handler = jest.fn((data: any) => {
            return {
                items: [
                    {
                        key: 'item-a',
                        label: 'Label A',
                        type: MenuItemType.LINK,
                        href: 'https://google.com'
                    }
                ]
            };
        });

        const unsubscribe = client.onRequest(handler);

        unsubscribe();

        const response = await mockFramepostClient.mockRequest(
            UiAppRequestType.GET_DASHBOARD_COG_MENU_ITEMS,
            'data'
        );

        expect(response.items).toEqual([]);
    });
});