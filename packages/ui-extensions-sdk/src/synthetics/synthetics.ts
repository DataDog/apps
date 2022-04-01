// Actions are UiAppRequestType requests that are sent from Datadog to the parent synthetics
import type {
    ContextClient,
    LoggerClient,
    RequestClient,
} from '../types';

import { DDSyntheticsCogMenuClient } from './synthetics-cog-menu/synthetics-cog-menu';

export class DDSyntheticsClient {
    private readonly client: ContextClient & LoggerClient & RequestClient;
    cogMenu: DDSyntheticsCogMenuClient;

    constructor(client: ContextClient & LoggerClient & RequestClient) {
        this.client = client;
        this.cogMenu = new DDSyntheticsCogMenuClient(this.client);
    }
}