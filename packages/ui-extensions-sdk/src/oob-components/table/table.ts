import type { DDClient } from '../../client/client';
import { RequestType } from '../../constants';
import type { TableDefRequestResponse } from '../../types';

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
            passedKey: string
        ) => TableDefRequestResponse | Promise<TableDefRequestResponse>
    ) {
        // TODO: check if tableKey === passedKey ?
        const wrappedHandler = async (
            passedKey: string
        ): Promise<TableDefRequestResponse> => {
            const response = await requestHandler(passedKey);

            return response;
        };
        this.client.framePostClient.onRequest(
            RequestType.GET_TABLE_DEF,
            wrappedHandler
        );

        // TODO: return an unsubscribe hook
    }
}
