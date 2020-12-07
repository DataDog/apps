import { DDMetricsAPIClient } from './metrics';

class MockAPIClient {
    get: jest.Mock;

    constructor() {
        this.get = jest.fn();
    }
}

const apiClient = new MockAPIClient();
const metrics = new DDMetricsAPIClient(apiClient as any);

afterEach(() => {
    jest.clearAllMocks();
});

describe('metrics api v1', () => {
    test('has a getMetaData method', () => {
        metrics.getMetadata('metric_id');

        expect(apiClient.get).toBeCalledWith('/api/v1/metrics/metric_id');
    });

    test('has a listActiveMetrics method', () => {
        metrics.listActiveMetrics({
            from: 10101010101,
            host: 'host'
        });

        expect(apiClient.get).toBeCalledWith('/api/v1/metrics', {
            params: {
                from: 10101010101,
                host: 'host'
            }
        });
    });

    test('has a search method', () => {
        metrics.search({
            q: 'query'
        });

        expect(apiClient.get).toBeCalledWith('/api/v1/search', {
            params: {
                q: 'query'
            }
        });
    });

    test('has a timeseries query method', () => {
        metrics.query({
            from: 10101010101,
            to: 10101010101,
            query: 'query'
        });

        expect(apiClient.get).toBeCalledWith('/api/v1/query', {
            params: {
                from: 10101010101,
                to: 10101010101,
                query: 'query'
            }
        });
    });
});
