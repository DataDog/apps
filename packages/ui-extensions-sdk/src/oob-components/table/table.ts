import type { DDClient } from '../../client/client';
import { RequestType } from '../../constants';
import type { GetTableDefResponse, GetTableDefRequest } from '../../types';

export class DDTableClient {
    private readonly client: DDClient;
    constructor(client: DDClient) {
        this.client = client;
    }

    /**
     * Registers a request handler for defining table data and options dynamically
     */

    onRequest(
        tableKey: string,
        requestHandler: (
            context: GetTableDefRequest
        ) => GetTableDefResponse | Promise<GetTableDefResponse>
    ) {
        // TODO: check if tableKey === passedKey ?
        const wrappedHandler = async (
            context: GetTableDefRequest
        ): Promise<GetTableDefResponse> => {
            const response = await requestHandler(context);

            return response;
        };
        this.client.framePostClient.onRequest(
            RequestType.GET_TABLE_DEF,
            wrappedHandler
        );

        // TODO: return an unsubscribe hook
    }
}
