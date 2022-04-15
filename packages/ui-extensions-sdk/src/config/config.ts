import { RequestType } from '../constants';
import {
    OrgConfig,
    ContextClient,
    LoggerClient,
    RequestClient
} from '../types';

export class DDConfigClient {
    private readonly client: ContextClient & LoggerClient & RequestClient;

    constructor(client: ContextClient & LoggerClient & RequestClient) {
        this.client = client;
    }

    async getOrgConfig(): Promise<OrgConfig> {
        return this.client.request(RequestType.GET_ORG_CONFIG);
    }
}
