import { RequestType } from '../constants';
import { MockClient } from '../utils/testUtils';

import { DDConfigClient } from './config';

let mockClient: MockClient;
let configClient: DDConfigClient;

beforeEach(() => {
    mockClient = new MockClient();
    configClient = new DDConfigClient(mockClient as any);
});

describe('DDConfigClient', () => {
    test('can return app config', async () => {
        mockClient.framePostClient.request = jest.fn();

        await configClient.getOrgConfig();

        expect(mockClient.framePostClient.request).toHaveBeenCalledWith(
            RequestType.GET_CONFIG,
            undefined
        );
    });
});
