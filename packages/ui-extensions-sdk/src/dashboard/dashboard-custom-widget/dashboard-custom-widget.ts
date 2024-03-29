import { RequestType, FeatureType } from '../../constants';
import { DDFeatureClient } from '../../shared/feature-client';
import type {
    ContextClient,
    LoggerClient,
    RequestClient,
    WidgetOptionItem
} from '../../types';

export class DDDashboardCustomWidgetClient extends DDFeatureClient {
    constructor(client: ContextClient & LoggerClient & RequestClient) {
        super(client, FeatureType.DASHBOARD_CUSTOM_WIDGET);
    }

    async updateOptions(newOptions: WidgetOptionItem[]) {
        const { widget } = await this.getContext();
        if (widget?.definition && widget?.id) {
            return this.sendRequest(
                RequestType.DASHBOARD_CUSTOM_WIDGET_OPTIONS_UPDATE,
                {
                    customWidgetKey: widget.definition.custom_widget_key,
                    customWidgetID: widget.id,
                    newOptions
                }
            );
        }
    }
}
