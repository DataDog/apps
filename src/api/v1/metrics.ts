import type { DDAPIClient } from '../client';

export class DDMetricsAPIClient {
    private apiClient: DDAPIClient;

    constructor(apiClient: DDAPIClient) {
        this.apiClient = apiClient;
    }

    /**
     * Get metadata about a specific metric
     * @see https://docs.datadoghq.com/api/v1/metrics/#get-metric-metadata
     */
    getMetadata(metricId: string) {
        return this.apiClient.get(`/api/v1/metrics/${metricId}`);
    }

    /**
     * Get the list of actively reporting metrics from a given time until now.
     * @see https://docs.datadoghq.com/api/v1/metrics/#get-active-metrics-list
     */
    listActiveMetrics(params: ListActiveMetricsParams) {
        return this.apiClient.get('/api/v1/metrics', { params });
    }

    /**
     * Search for metrics from the last 24 hours
     * @see https://docs.datadoghq.com/api/v1/metrics/#search-metrics
     */
    search(params: SearchMetricsParams) {
        return this.apiClient.get('/api/v1/metrics/search', { params });
    }

    /**
     * Query timeseries points.
     * @see https://docs.datadoghq.com/api/v1/metrics/#query-timeseries-points
     */
    query(params: QueryTimeseriesParams) {
        return this.apiClient.get('/api/v1/query', { params });
    }
}

export interface ListActiveMetricsParams {
    from: number;
    host?: string;
}

export interface SearchMetricsParams {
    q: string;
}

export interface QueryTimeseriesParams {
    from: number;
    to: number;
    query: string;
}
