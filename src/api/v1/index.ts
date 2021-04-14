import type { DDAPIClient } from '../api';

import { DDMetricsAPIClient } from './metrics';
import { DDLogsAPIClient } from './logs-analytics';

export class DDAPIV1Client {
    readonly metrics: DDMetricsAPIClient;
    readonly logs: DDLogsAPIClient;

    constructor(apiClient: DDAPIClient) {
        this.metrics = new DDMetricsAPIClient(apiClient);
        this.logs = new DDLogsAPIClient(apiClient);
    }
}
