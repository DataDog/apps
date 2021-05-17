import type { DDClient } from '../../client/client';
import {
    UiAppEventType,
    UiAppFeatureType,
    UiAppRequestType
} from '../../constants';
import { DDFeatureClient } from '../../shared/feature-client';
import type {
    GetDashboardCustomWidgetOptionsResponse,
    WidgetOptionItem
} from '../../types';

const emptyConfig: GetDashboardCustomWidgetOptionsResponse = { widgets: [] };

export class DDDashboardCustomWidgetClient extends DDFeatureClient {
    constructor(client: DDClient) {
        super(client, UiAppFeatureType.DASHBOARD_CUSTOM_WIDGET);

        // initialize with an empty reponse handler
        this.onRequest(() => emptyConfig);
    }

    /**
     * Registers a request handler for providing custom widget items dynamically
     */
    onRequest(
        requestHandler: () =>
            | GetDashboardCustomWidgetOptionsResponse
            | Promise<GetDashboardCustomWidgetOptionsResponse>
    ) {
        this.client.framePostClient.onRequest(
            UiAppRequestType.GET_DASHBOARD_CUSTOM_WIDGET_ITEMS,
            async (): Promise<GetDashboardCustomWidgetOptionsResponse> => {
                await this.validateFeatureIsEnabled();

                const { widgets } = await requestHandler();

                return { widgets };
            }
        );

        // return an unsubscribe hook
        return () => {
            this.onRequest(() => emptyConfig);
        };
    }

    async updateOptions(newOptions: WidgetOptionItem[]) {
        const { widget } = await this.client.getContext();
        if (widget?.definition) {
            return this.client.framePostClient.request(
                UiAppEventType.DASHBOARD_CUSTOM_WIDGET_OPTIONS_UPDATE,
                {
                    customWidgetKey: widget.definition.custom_widget_key,
                    newOptions
                }
            );
        }
    }
}
