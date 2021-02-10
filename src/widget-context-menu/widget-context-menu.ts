import type { ChildClient } from '@datadog/framepost';

import { UiAppFeatureType, UiAppRequestType } from '../constants';
import { DDFeatureClient } from '../shared/feature-client';
import type {
    GetWidgetContextMenuItemsRequest,
    GetWidgetContextMenuItemsResponse
} from '../types';
import type { Logger } from '../utils/logger';
import { validateKey } from '../utils/utils';

const emptyConfig: GetWidgetContextMenuItemsResponse = { items: [] };

export class DDWidgetContextMenuClient extends DDFeatureClient {
    constructor(debug: boolean, logger: Logger, framePostClient: ChildClient) {
        super(
            debug,
            logger,
            framePostClient,
            UiAppFeatureType.WIDGET_CONTEXT_MENU
        );

        // initialize with an empty reponse handler
        this.onRequest(() => emptyConfig);
    }

    /**
     * Registers a request handler for providing context menu items dynamically
     */
    onRequest(
        requestHandler: (
            context: GetWidgetContextMenuItemsRequest
        ) =>
            | GetWidgetContextMenuItemsResponse
            | Promise<GetWidgetContextMenuItemsResponse>
    ) {
        const wrappedHandler = async (
            context: GetWidgetContextMenuItemsRequest
        ): Promise<GetWidgetContextMenuItemsResponse> => {
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
            UiAppRequestType.GET_WIDGET_CONTEXT_MENU_ITEMS,
            wrappedHandler
        );

        // return an unsubscribe hook
        return () => {
            this.onRequest(() => emptyConfig);
        };
    }
}
