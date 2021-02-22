import { UiAppRequestType } from '../constants';
import { getLogger } from '../utils/logger';
import { MockFramePostChildClient, mockContext } from '../utils/testUtils';

import { DDAuthClient } from './auth';

let mockFramepostClient: MockFramePostChildClient;
let client: DDAuthClient;

beforeEach(() => {
    mockFramepostClient = new MockFramePostChildClient();
    client = new DDAuthClient(
        true,
        getLogger({ debug: true }),
        mockFramepostClient as any
    );
});

describe('client.requestAuthTokens', () => {
    it('sends a REQUEST_AUTH_TOKENS request to the parent with the auth url', async () => {
        mockFramepostClient.init(mockContext);

        const requestMock = jest
            .spyOn(mockFramepostClient, 'request')
            .mockImplementation(() => 'a=abc&b=xyz');

        const response = await client.requestAuthTokens(
            'https:///auth.com',
            'http://domain.com'
        );
        expect(response.get('a')).toEqual('abc');
        expect(response.get('b')).toEqual('xyz');
        expect(requestMock).toHaveBeenCalledWith(
            UiAppRequestType.REQUEST_AUTH_TOKENS,
            {
                authUrl: 'https:///auth.com',
                redirectUrlOrigin: 'http://domain.com'
            }
        );
    });
});

describe('client.resolveAuthTokens', () => {
    it('responds to REQUEST_AUTH_TOKENS request to the parent with the current URL query params', async () => {
        mockFramepostClient.init(mockContext);

        let response = await mockFramepostClient.mockRequest(
            UiAppRequestType.REQUEST_AUTH_TOKENS
        );

        expect(response).toBeUndefined();

        client.resolveAuthTokens('?a=abc&b=xyz');

        response = await mockFramepostClient.mockRequest(
            UiAppRequestType.REQUEST_AUTH_TOKENS
        );

        expect(response).toEqual('?a=abc&b=xyz');
    });
});
