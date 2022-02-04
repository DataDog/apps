import { FeatureType, RequestType } from '../constants';
import { DDFeatureClient } from '../shared/feature-client';
import type {
    ContextClient,
    GetWidgetContextMenuItemsRequest,
    GetWidgetContextMenuItemsResponse,
    LoggerClient,
    RequestClient
} from '../types';
import { validateKey } from '../utils/utils';

const emptyConfig: GetWidgetContextMenuItemsResponse = { items: [] };

export class DDWidgetContextMenuClient extends DDFeatureClient {
    constructor(client: ContextClient & LoggerClient & RequestClient) {
        super(client, FeatureType.WIDGET_CONTEXT_MENU);

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
            await this.validateFeatureIsEnabled();

            const { items } = await requestHandler(context);

            return {
                items: items.filter(item => {
                    try {
                        validateKey(item);
                    } catch (e) {
                        if (e instanceof Error) {
                            this.client.logError(e.message);
                        }

                        return false;
                    }

                    return true;
                })
            };
        };

        this.client.onRequest(
            RequestType.GET_WIDGET_CONTEXT_MENU_ITEMS,
            wrappedHandler
        );

        // return an unsubscribe hook
        return () => {
            this.onRequest(() => emptyConfig);
        };
    }
}
