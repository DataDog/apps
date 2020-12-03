import type { DDAPIClient } from '../client';

import { DDMetricsAPIClient } from './metrics';

export class DDAPIV1Client {
    readonly metrics: DDMetricsAPIClient;

    constructor(apiClient: DDAPIClient) {
        this.metrics = new DDMetricsAPIClient(apiClient);
    }
}
