import { UiAppRequestType } from '../constants';
import { getLogger } from '../utils/logger';
import { MockFramePostChildClient, mockContext } from '../utils/testUtils';

import { DDSecretsClient } from './secrets';

let mockFramepostClient: MockFramePostChildClient;
let client: DDSecretsClient;

beforeEach(() => {
    mockFramepostClient = new MockFramePostChildClient();
    client = new DDSecretsClient(
        true,
        getLogger({ debug: true }),
        mockFramepostClient as any
    );
});

describe('loadPrivateSecret', () => {
    it('sends a DECRYPT_SECRET request to the parent with the data to encrypt', async () => {
        mockFramepostClient.init(mockContext);

        const requestMock = jest
            .spyOn(mockFramepostClient, 'request')
            .mockImplementation(() => null);

        const response = await client.loadPrivateSecret('my-secret-key');
        expect(response).toEqual(null);
        expect(requestMock).toHaveBeenCalledWith(
            UiAppRequestType.DECRYPT_SECRET,
            'my-secret-key'
        );
    });
});
