import type { DDAPIClient } from '../api';

import { DDLogsAPIClient } from './logs-analytics';
import { DDMetricsAPIClient } from './metrics';

export class DDAPIV1Client {
    readonly metrics: DDMetricsAPIClient;
    readonly logs: DDLogsAPIClient;

    constructor(apiClient: DDAPIClient) {
        this.metrics = new DDMetricsAPIClient(apiClient);
        this.logs = new DDLogsAPIClient(apiClient);
    }
}
