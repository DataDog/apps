import type { ChildClient } from '@datadog/framepost';

import { DDFeatureClient } from '../client/featureClient';
import { UiAppFeatureType, UiAppRequestType } from '../constants';
import type {
    GetContextMenuItemsRequest,
    GetContextMenuItemsResponse
} from '../types';
import type { Logger } from '../utils/logger';
import { validateKey } from '../utils/utils';

const emptyConfig: GetContextMenuItemsResponse = { items: [] };

export class DDDashboardContextMenuClient extends DDFeatureClient {
    constructor(debug: boolean, logger: Logger, framePostClient: ChildClient) {
        super(
            debug,
            logger,
            framePostClient,
            UiAppFeatureType.DASHBOARD_CONTEXT_MENU
        );

        // initialize with an empty reponse handler
        this.onRequestItems(() => emptyConfig);
    }

    /**
     * Registers a request handler for providing context menu items dynamically
     */
    onRequestItems(
        requestHandler: (
            context: GetContextMenuItemsRequest
        ) => GetContextMenuItemsResponse | Promise<GetContextMenuItemsResponse>
    ) {
        const wrappedHandler = async (
            context: GetContextMenuItemsRequest
        ): Promise<GetContextMenuItemsResponse> => {
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
            UiAppRequestType.GET_CONTEXT_MENU_ITEMS,
            wrappedHandler
        );

        // return an unsubscribe hook
        return () => {
            this.onRequestItems(() => emptyConfig);
        };
    }
}
