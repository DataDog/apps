import { FeatureType, RequestType } from '../../constants';
import { DDFeatureClient } from '../../shared/feature-client';
import type {
    ContextClient,
    GetSyntheticsCogMenuItemsRequest,
    GetSyntheticsCogMenuItemsResponse,
    LoggerClient,
    RequestClient
} from '../../types';
import { validateKey } from '../../utils/utils';

const emptyConfig: GetSyntheticsCogMenuItemsResponse = { items: [] };

export class DDSyntheticsCogMenuClient extends DDFeatureClient {
    constructor(client: ContextClient & LoggerClient & RequestClient) {
        super(client, FeatureType.SYNTHETICS_COG_MENU);

        // initialize with an empty reponse handler
        this.onRequest(() => emptyConfig);
    }

    /**
     * Registers a request handler for providing cog menu items dynamically
     */
    onRequest(
        requestHandler: (
            context: GetSyntheticsCogMenuItemsRequest
        ) =>
            | GetSyntheticsCogMenuItemsResponse
            | Promise<GetSyntheticsCogMenuItemsResponse>
    ) {
        const wrappedHandler = async (
            context: GetSyntheticsCogMenuItemsRequest
        ): Promise<GetSyntheticsCogMenuItemsResponse> => {
            const { items } = await requestHandler(context);

            return {
                items: items.filter(item => {
                    try {
                        validateKey(item);
                    } catch (e) {
                        if (e instanceof Error) {
                            this.logError(e.message);
                        }

                        return false;
                    }

                    return true;
                })
            };
        };

        this.handleRequest(
            RequestType.GET_SYNTHETICS_COG_MENU_ITEMS,
            wrappedHandler
        );

        // return an unsubscribe hook
        return () => {
            this.onRequest(() => emptyConfig);
        };
    }
}
