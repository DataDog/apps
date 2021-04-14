import type { DDAPIClient } from '../api';

export class DDLogsAPIClient {
    private apiClient: DDAPIClient;

    constructor(apiClient: DDAPIClient) {
        this.apiClient = apiClient;
    }

    /**
     * aggregate events into buckets and compute metrics and timeseries
     * @see https://docs.datadoghq.com/api/latest/logs/
     */
    aggregate(params: AggregateParams) {
        return this.apiClient.post('/api/v2/logs/analytics/aggregate', params);
    }
}

export type Aggregation =
    | 'count'
    | 'cardinality'
    | 'pc75'
    | 'pc90'
    | 'pc95'
    | 'pc98'
    | 'pc99'
    | 'sum'
    | 'min'
    | 'max'
    | 'avg';

export interface AggregateParams {
    compute: {
        aggregation: Aggregation;
        interval?: string;
        metric?: string;
        type?: 'timseries' | 'total';
    };

    group_by: {
        facet: string;
        histogram?: {
            interval: number;
            min: number;
            max: number;
        };
        limit?: number;
        missing?: string | number;
        sort?: {
            aggregation: Aggregation;
            metric: string;
            order?: 'asc' | 'desc';
            type: 'alphabetical' | 'measure';
        };
        total?: boolean | string | number;
    }[];

    filter?: {
        to: string;
        from: string;
        indexes: string[];
        query: string;
    };

    options?: {
        timeOffset?: number;
        timezone?: string;
    };

    page?: {
        cursor: string;
    };
}
