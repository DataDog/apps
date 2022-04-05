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
        const mockConfig = {
            customStringKey: 'customVal',
            customBooleanKey: true
        };

        mockClient.framePostClient.onRequest(RequestType.GET_CONFIG, () =>
            Promise.resolve(mockConfig)
        );

        const config = await configClient.getConfig();
        expect(config).toEqual(mockConfig);
    });
});
