import type { DDClient } from '../../client/client';
import { RequestType } from '../../constants';
import type { TableDefRequestResponse } from '../../types';

export class DDTableClient {
    private readonly client: DDClient;
    constructor(client: DDClient) {
        console.log('xxx sdk DDTableClient constructor');
        this.client = client;
    }

    /**
     * Registers a request handler for defining table data and options dynamically
     */

    onRequest(
        key: string,
        requestHandler: (
            passedKey: string
        ) => TableDefRequestResponse | Promise<TableDefRequestResponse>
    ) {
        console.log('xxx sdk onRequest key', key);
        const wrappedHandler = async (
            passedKey: string
        ): Promise<TableDefRequestResponse> => {
            console.log('xxx passedKey', passedKey);
            const { data, columns } = await requestHandler(passedKey);

            console.log('xxx requestHandler data, columns', data, columns);

            return {
                data,
                columns
            };
        };
        this.client.framePostClient.onRequest(
            RequestType.GET_TABLE_DEF,
            wrappedHandler
        );
    }
}
