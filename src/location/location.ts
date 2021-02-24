import type { DDClient } from '../client/client';
import { UiAppRequestType } from '../constants';

export class DDLocationClient {
    private readonly client: DDClient;

    constructor(client: DDClient) {
        this.client = client;
    }

    async goTo(url: string) {
        return this.client.framePostClient.request<NavigateTopRequest>(
            UiAppRequestType.NAVIGATE_TOP,
            {
                url
            }
        );
    }
}

export interface NavigateTopRequest {
    url: string;
}
