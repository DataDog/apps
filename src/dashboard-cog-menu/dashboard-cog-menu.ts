import type { ChildClient } from '@datadog/framepost';

import { UiAppFeatureType, UiAppRequestType } from '../constants';
import { DDFeatureClient } from '../shared/feature-client';
import type {
    GetDashboardCogMenuItemsRequest,
    GetDashboardCogMenuItemsResponse
} from '../types';
import type { Logger } from '../utils/logger';
import { validateKey } from '../utils/utils';

const emptyConfig: GetDashboardCogMenuItemsResponse = { items: [] };

export class DDDashboardCogMenuClient extends DDFeatureClient {
    constructor(debug: boolean, logger: Logger, framePostClient: ChildClient) {
        super(
            debug,
            logger,
            framePostClient,
            UiAppFeatureType.DASHBOARD_COG_MENU
        );

        // initialize with an empty reponse handler
        this.onRequest(() => emptyConfig);
    }

    /**
     * Registers a request handler for providing context menu items dynamically
     */
    onRequest(
        requestHandler: (
            context: GetDashboardCogMenuItemsRequest
        ) =>
            | GetDashboardCogMenuItemsResponse
            | Promise<GetDashboardCogMenuItemsResponse>
    ) {
        const wrappedHandler = async (
            context: GetDashboardCogMenuItemsRequest
        ): Promise<GetDashboardCogMenuItemsResponse> => {
            try {
                await this.validateFeatureIsEnabled();
            } catch (e) {
                this.logger.error(e.message);

                return emptyConfig;
            }

            const { items } = await requestHandler(context);

            return {
                items: items.filter(item => {
                    try {
                        validateKey(item);
                    } catch (e) {
                        this.logger.error(e.message);

                        return false;
                    }

                    return true;
                })
            };
        };

        this.framePostClient.onRequest(
            UiAppRequestType.GET_DASHBOARD_COG_MENU_ITEMS,
            wrappedHandler
        );

        // return an unsubscribe hook
        return () => {
            this.onRequest(() => emptyConfig);
        };
    }
}
