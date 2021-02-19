import { UiAppRequestType } from '../constants';
import { MockClient, mockContext } from '../utils/testUtils';

import { DDAuthClient } from './auth';

let client: MockClient;
let authClient: DDAuthClient;

beforeEach(() => {
    client = new MockClient();
    authClient = new DDAuthClient(client as any);
});

describe('client.requestAuthTokens', () => {
    it('sends a REQUEST_AUTH_TOKENS request to the parent with the auth url', async () => {
        client.framePostClient.init(mockContext);

        const requestMock = jest
            .spyOn(client.framePostClient, 'request')
            .mockImplementation(() => 'a=abc&b=xyz');

        const response = await authClient.requestAuthTokens(
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
        client.framePostClient.init(mockContext);

        let response = await client.framePostClient.mockRequest(
            UiAppRequestType.REQUEST_AUTH_TOKENS
        );

        expect(response).toBeUndefined();

        authClient.resolveAuthTokens('?a=abc&b=xyz');

        response = await client.framePostClient.mockRequest(
            UiAppRequestType.REQUEST_AUTH_TOKENS
        );

        expect(response).toEqual('?a=abc&b=xyz');
    });
});
