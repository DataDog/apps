import {
    FeatureType,
    RequestType,
    WidgetOptionItemType
} from '../../constants';
import { Context, GetDashboardCustomWidgetOptionsResponse } from '../../types';
import { MockClient, mockContext } from '../../utils/testUtils';
import { GetDashboardCustomWidgetOptionsRequest } from '../..';

import { DDDashboardCustomWidgetClient } from './dashboard-custom-widget';

describe('DDDashboardCustomWidgetClient', () => {
    describe('onOptionsRequest', () => {
        test('throws an error if `DASHBOARD_CUSTOM_WIDGET` is not enabled', async () => {
            const client = new MockClient();
            const context: Context = {
                ...mockContext,
                app: {
                    ...mockContext.app,
                    features: []
                }
            };
            client.framePostClient.init(context);
            const dashboardCustomWidgetClient = new DDDashboardCustomWidgetClient(
                client
            );
            const handler = jest.fn<
                GetDashboardCustomWidgetOptionsResponse,
                [GetDashboardCustomWidgetOptionsRequest]
            >(() => {
                return {
                    options: [
                        {
                            type: WidgetOptionItemType.BOOLEAN,
                            label: 'option',
                            name: 'option'
                        }
                    ]
                };
            });
            dashboardCustomWidgetClient.onOptionsRequest(handler);

            const response = client.framePostClient.mockRequest(
                RequestType.GET_DASHBOARD_CUSTOM_WIDGET_OPTIONS,
                { widget: { definition: { custom_widget_key: 'key' } } }
            );

            await expect(response).rejects.toBeInstanceOf(Error);
            expect(handler).not.toHaveBeenCalled();
        });

        test('registers an empty handler on init', async () => {
            const client = new MockClient();
            const context: Context = {
                ...mockContext,
                app: {
                    ...mockContext.app,
                    features: [FeatureType.DASHBOARD_CUSTOM_WIDGET]
                }
            };
            client.framePostClient.init(context);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const dashboardCustomWidgetClient = new DDDashboardCustomWidgetClient(
                client
            );

            const response = client.framePostClient.mockRequest(
                RequestType.GET_DASHBOARD_CUSTOM_WIDGET_OPTIONS,
                { widget: { definition: { custom_widget_key: 'key' } } }
            );

            await expect(response).resolves.toEqual({ options: [] });
        });

        test('registers the provided handler when onOptionsRequest is called', async () => {
            const client = new MockClient();
            const context: Context = {
                ...mockContext,
                app: {
                    ...mockContext.app,
                    features: [FeatureType.DASHBOARD_CUSTOM_WIDGET]
                }
            };
            client.framePostClient.init(context);
            const dashboardCustomWidgetClient = new DDDashboardCustomWidgetClient(
                client
            );
            const handler = jest.fn<
                GetDashboardCustomWidgetOptionsResponse,
                [GetDashboardCustomWidgetOptionsRequest]
            >(() => {
                return {
                    options: [
                        {
                            type: WidgetOptionItemType.BOOLEAN,
                            label: 'option',
                            name: 'option'
                        }
                    ]
                };
            });
            dashboardCustomWidgetClient.onOptionsRequest(handler);

            const response = client.framePostClient.mockRequest(
                RequestType.GET_DASHBOARD_CUSTOM_WIDGET_OPTIONS,
                { widget: { definition: { custom_widget_key: 'key' } } }
            );

            await expect(response).resolves.toEqual({
                options: [
                    {
                        type: WidgetOptionItemType.BOOLEAN,
                        label: 'option',
                        name: 'option'
                    }
                ]
            });
            expect(handler).toHaveBeenCalledWith({
                widget: { definition: { custom_widget_key: 'key' } }
            });
        });

        test('returns an unsubscribe hook that replaces with an empty handler', async () => {
            const client = new MockClient();
            const context: Context = {
                ...mockContext,
                app: {
                    ...mockContext.app,
                    features: [FeatureType.DASHBOARD_CUSTOM_WIDGET]
                }
            };
            client.framePostClient.init(context);
            const dashboardCustomWidgetClient = new DDDashboardCustomWidgetClient(
                client
            );
            const handler = jest.fn<
                GetDashboardCustomWidgetOptionsResponse,
                [GetDashboardCustomWidgetOptionsRequest]
            >(() => {
                return {
                    options: [
                        {
                            type: WidgetOptionItemType.BOOLEAN,
                            label: 'option',
                            name: 'option'
                        }
                    ]
                };
            });
            const unsubscribe = dashboardCustomWidgetClient.onOptionsRequest(
                handler
            );

            unsubscribe();
            const response = client.framePostClient.mockRequest(
                RequestType.GET_DASHBOARD_CUSTOM_WIDGET_OPTIONS,
                { widget: { definition: { custom_widget_key: 'key' } } }
            );

            await expect(response).resolves.toEqual({
                options: []
            });
            expect(handler).not.toHaveBeenCalled();
        });
    });

    describe('updateOptions', () => {
        test('does not sends a request if there is no widget', async () => {
            const client = new MockClient();
            const context: Context = {
                ...mockContext,
                app: {
                    ...mockContext.app,
                    features: [FeatureType.DASHBOARD_CUSTOM_WIDGET]
                }
            };
            client.framePostClient.init(context);
            const dashboardCustomWidgetClient = new DDDashboardCustomWidgetClient(
                client
            );
            const requestSpy = jest.spyOn(client, 'request');

            const response = dashboardCustomWidgetClient.updateOptions([]);

            await expect(response).resolves.toEqual(undefined);
            expect(requestSpy).not.toHaveBeenCalled();
        });

        test('throws an error if `DASHBOARD_CUSTOM_WIDGET` is not enabled', async () => {
            const client = new MockClient();
            const context: Context = {
                ...mockContext,
                app: {
                    ...mockContext.app,
                    features: []
                },
                widget: {
                    definition: {
                        custom_widget_key: 'key'
                    },
                    id: 1
                }
            };
            client.framePostClient.init(context);
            const dashboardCustomWidgetClient = new DDDashboardCustomWidgetClient(
                client
            );
            const requestSpy = jest.spyOn(client, 'request');

            const response = dashboardCustomWidgetClient.updateOptions([
                {
                    type: WidgetOptionItemType.BOOLEAN,
                    label: 'option',
                    name: 'option'
                }
            ]);

            await expect(response).rejects.toBeInstanceOf(Error);
            expect(requestSpy).not.toHaveBeenCalledWith();
        });

        test('sends a request if `DASHBOARD_CUSTOM_WIDGET` is enabled', async () => {
            const client = new MockClient();
            const context: Context = {
                ...mockContext,
                app: {
                    ...mockContext.app,
                    features: [FeatureType.DASHBOARD_CUSTOM_WIDGET]
                },
                widget: {
                    definition: {
                        custom_widget_key: 'key'
                    },
                    id: 1
                }
            };
            client.framePostClient.init(context);
            const dashboardCustomWidgetClient = new DDDashboardCustomWidgetClient(
                client
            );
            const requestSpy = jest.spyOn(client, 'request');

            const response = dashboardCustomWidgetClient.updateOptions([
                {
                    type: WidgetOptionItemType.BOOLEAN,
                    label: 'option',
                    name: 'option'
                }
            ]);

            await expect(response).resolves.toEqual(undefined);
            expect(requestSpy).toHaveBeenCalledWith(
                'dashboard_custom_widget_options_update',
                {
                    customWidgetID: 1,
                    customWidgetKey: 'key',
                    newOptions: [
                        {
                            type: WidgetOptionItemType.BOOLEAN,
                            label: 'option',
                            name: 'option'
                        }
                    ]
                }
            );
        });
    });
});
