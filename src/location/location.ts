import type { DDClient } from '../client/client';
import { RequestType } from '../constants';

export class DDLocationClient {
    private readonly client: DDClient;

    constructor(client: DDClient) {
        this.client = client;
    }

    async goTo(url: string) {
        return this.client.framePostClient.request<NavigateTopRequest>(
            RequestType.NAVIGATE_TOP,
            {
                url
            }
        );
    }
}

export interface NavigateTopRequest {
    url: string;
}
