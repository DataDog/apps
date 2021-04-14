import { AggregateParams, DDLogsAPIClient } from './logs-analytics';

class MockAPIClient {
    post: jest.Mock;

    constructor() {
        this.post = jest.fn();
    }
}

const apiClient = new MockAPIClient();
const logs = new DDLogsAPIClient(apiClient as any);

afterEach(() => {
    jest.clearAllMocks();
});

describe('logs api v2', () => {
    test('has an aggregate method', () => {
        const params: AggregateParams = {
            compute: { aggregation: 'avg' },
            group_by: [{ facet: 'foo' }]
        };

        logs.aggregate(params);

        expect(apiClient.post).toBeCalledWith(
            '/api/v2/logs/analytics/aggregate',
            params
        );
    });
});
