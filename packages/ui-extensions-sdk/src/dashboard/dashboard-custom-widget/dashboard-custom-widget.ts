import { RequestType, FeatureType } from '../../constants';
import { DDFeatureClient } from '../../shared/feature-client';
import type {
    ContextClient,
    GetDashboardCustomWidgetOptionsRequest,
    GetDashboardCustomWidgetOptionsResponse,
    LoggerClient,
    RequestClient,
    WidgetOptionItem
} from '../../types';

const emptyResponse: GetDashboardCustomWidgetOptionsResponse = {
    options: []
};

export class DDDashboardCustomWidgetClient extends DDFeatureClient {
    constructor(client: ContextClient & LoggerClient & RequestClient) {
        super(client, FeatureType.DASHBOARD_CUSTOM_WIDGET);

        this.onOptionsRequest(() => emptyResponse);
    }

    /**
     * Registers a request handler for providing custom widget options dynamically.
     * This should only be used in the controller.
     *
     * @param requestHandler The callback that responds to requests for custom widget options.
     * @since 0.28.0
     *
     * @example
     * In the controller:
     * ```TypeScript
     * import * as uiExtensionsSDK from '@datadog/ui-extensions-sdk';
     *
     * export function setup() {
     *     const client = uiExtensionsSDK.init();
     *     client.dashboard.customWidget.onOptionsRequest(
     *         (
     *             request: uiExtensionsSDK.GetDashboardCustomWidgetOptionsRequest
     *         ): uiExtensionsSDK.GetDashboardCustomWidgetOptionsResponse => {
     *             return {
     *                 options: [
     *                     {
     *                         type: uiExtensionsSDK.WidgetOptionItemType.BOOLEAN,
     *                         name: 'option-1',
     *                         label: 'Enable option 1?',
     *                     },
     *                     {
     *                         type: uiExtensionsSDK.WidgetOptionItemType.BOOLEAN,
     *                         name: 'option-2',
     *                         label: 'Enable option 2?',
     *                     }
     *                 ]
     *             };
     *         }
     *     );
     * }
     * ```
     */
    onOptionsRequest(
        requestHandler: (
            request: GetDashboardCustomWidgetOptionsRequest
        ) =>
            | GetDashboardCustomWidgetOptionsResponse
            | Promise<GetDashboardCustomWidgetOptionsResponse>
    ) {
        this.handleRequest(
            RequestType.GET_DASHBOARD_CUSTOM_WIDGET_OPTIONS,
            requestHandler
        );

        return () => {
            this.onOptionsRequest(() => emptyResponse);
        };
    }

    /**
     * @deprecated Use {@link onOptionsRequest} in the controller instead of {@link updateOptions} in the widget.
     */
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
