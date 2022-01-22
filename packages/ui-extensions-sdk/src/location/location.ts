import { RequestType } from '../constants';
import { RequestClient } from '../types';

export class DDLocationClient {
    private readonly client: RequestClient;

    constructor(client: RequestClient) {
        this.client = client;
    }

    async goTo(url: string) {
        return this.client.request<NavigateTopRequest>(
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
