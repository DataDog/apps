import type { DDClient } from '../../client/client';
import { UiAppEventType, UiAppFeatureType } from '../../constants';
import { DDFeatureClient } from '../../shared/feature-client';
import type { WidgetOptionItem } from '../../types';

export class DDDashboardCustomWidgetClient extends DDFeatureClient {
    constructor(client: DDClient) {
        super(client, UiAppFeatureType.DASHBOARD_CUSTOM_WIDGET);
    }

    async updateOptions(newOptions: WidgetOptionItem[]) {
        const { widget } = await this.client.getContext();
        if (widget?.definition && widget?.id) {
            return this.client.framePostClient.request(
                UiAppEventType.DASHBOARD_CUSTOM_WIDGET_OPTIONS_UPDATE,
                {
                    customWidgetKey: widget.definition.custom_widget_key,
                    customWidgetID: widget.id,
                    newOptions
                }
            );
        }
    }
}
