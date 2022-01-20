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

        console.log('xxx sdk onRequest tableKey', tableKey);
        const wrappedHandler = async (
            context: GetTableDefRequest
        ): Promise<GetTableDefResponse> => {
            console.log('xxx sdk onRequest wrappedHandler context', context);
            const response = await requestHandler(context);

            return response;
        };
        this.requestSubscriptions[tableKey] = wrappedHandler;
        // this.client.framePostClient.onRequest(
        //     RequestType.GET_TABLE_DEF,
        //     wrappedHandler
        // );

        // TODO: return an unsubscribe hook
    }

    handleRequest(context: GetTableDefRequest) {
        console.log('xxx sdk handleRequest context', context);
        console.log(
            'xxx sdk handleRequest this.requestSubscriptions',
            this.requestSubscriptions
        );
        return this.requestSubscriptions[context.table.tableKey](context);
    }
}
