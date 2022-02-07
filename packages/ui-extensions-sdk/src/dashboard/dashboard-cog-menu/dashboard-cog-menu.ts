import { FeatureType, RequestType } from '../../constants';
import { DDFeatureClient } from '../../shared/feature-client';
import type {
    ContextClient,
    GetDashboardCogMenuItemsRequest,
    GetDashboardCogMenuItemsResponse,
    LoggerClient,
    RequestClient
} from '../../types';
import { validateKey } from '../../utils/utils';

const emptyConfig: GetDashboardCogMenuItemsResponse = { items: [] };

export class DDDashboardCogMenuClient extends DDFeatureClient {
    constructor(client: ContextClient & LoggerClient & RequestClient) {
        super(client, FeatureType.DASHBOARD_COG_MENU);

        // initialize with an empty reponse handler
        this.onRequest(() => emptyConfig);
    }

    /**
     * Registers a request handler for providing cog menu items dynamically
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
            RequestType.GET_DASHBOARD_COG_MENU_ITEMS,
            wrappedHandler
        );

        // return an unsubscribe hook
        return () => {
            this.onRequest(() => emptyConfig);
        };
    }
}
