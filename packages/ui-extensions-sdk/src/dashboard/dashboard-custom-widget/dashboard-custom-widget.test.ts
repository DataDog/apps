import { FeatureType, WidgetOptionItemType } from '../../constants';
import { Context } from '../../types';
import { MockClient, mockContext } from '../../utils/testUtils';

import { DDDashboardCustomWidgetClient } from './dashboard-custom-widget';

describe('DDDashboardCustomWidgetClient', () => {
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

        test('does not throw an error if `DASHBOARD_CUSTOM_WIDGET` is not enabled', async () => {
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

            await expect(response).resolves.not.toBeInstanceOf(Error);
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
