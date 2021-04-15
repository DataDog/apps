import type { DDClient } from '../../client/client';
import { UiAppFeatureType, UiAppRequestType } from '../../constants';
import { DDFeatureClient } from '../../shared/feature-client';
import type {
    GetDashboardCustomWidgetOptionsRequest,
    GetDashboardCustomWidgetOptionsResponse
} from '../../types';
import { validateKey } from '../../utils/utils';

const emptyConfig: GetDashboardCustomWidgetOptionsResponse = { widgets: [] };

export class DDDashboardCustomWidgetClient extends DDFeatureClient {
    constructor(client: DDClient) {
        super(client, UiAppFeatureType.DASHBOARD_CUSTOM_WIDGET);

        // initialize with an empty reponse handler
        this.onRequest(() => emptyConfig);
    }

    /**
     * Registers a request handler for providing context menu items dynamically
     */
    onRequest(
        requestHandler: (
            context: GetDashboardCustomWidgetOptionsRequest
        ) =>
            | GetDashboardCustomWidgetOptionsResponse
            | Promise<GetDashboardCustomWidgetOptionsResponse>
    ) {
        this.client.framePostClient.onRequest(
            UiAppRequestType.GET_DASHBOARD_CUSTOM_WIDGET_OPTIONS,
            async (
                context: GetDashboardCustomWidgetOptionsRequest
            ): Promise<GetDashboardCustomWidgetOptionsResponse> => {
                await this.validateFeatureIsEnabled();

                const { widgets } = await requestHandler(context);

                return {
                    widgets: widgets.filter(widget => {
                        try {
                            validateKey(widget);
                        } catch (e) {
                            this.client.logger.error(e.message);

                            return false;
                        }

                        return true;
                    })
                };
            }
        );

        // return an unsubscribe hook
        return () => {
            this.onRequest(() => emptyConfig);
        };
    }
}
