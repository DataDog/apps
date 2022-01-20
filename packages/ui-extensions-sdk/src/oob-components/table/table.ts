import type { DDClient } from '../../client/client';
import { RequestType } from '../../constants';
import type {
    GetTableDefResponse,
    GetTableDefRequest,
    TableRequestHandler
} from '../../types';

export class DDTableClient {
    private readonly client: DDClient;
    protected requestSubscriptions: {
        [tableKey: string]: TableRequestHandler;
    };
    constructor(client: DDClient) {
        this.client = client;
        this.requestSubscriptions = {};

        this.client.framePostClient.onRequest(
            RequestType.GET_TABLE_DEF,
            this.handleRequest.bind(this)
        );
    }

    /**
     * Registers a request handler for defining table data and options dynamically
     */

    onRequest(tableKey: string, requestHandler: TableRequestHandler) {
        // TODO: check if tableKey === passedKey ?

        const wrappedHandler = async (
            context: GetTableDefRequest
        ): Promise<GetTableDefResponse> => {
            const response = await requestHandler(context);

            return response;
        };
        this.requestSubscriptions[tableKey] = wrappedHandler;

        // TODO: return an unsubscribe hook
    }

    handleRequest(context: GetTableDefRequest) {
        return this.requestSubscriptions[context.table.tableKey](context);
    }
}
