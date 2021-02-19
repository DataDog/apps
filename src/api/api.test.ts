import { IFrameApiRequestMethod, UiAppRequestType } from '../constants';
import { MockClient } from '../utils/testUtils';

import { DDAPIClient } from './api';

let client: MockClient;
let apiClient: DDAPIClient;

beforeEach(() => {
    client = new MockClient();
    apiClient = new DDAPIClient(client as any);

    client.framePostClient.request = jest.fn(() => ({
        isError: false
    }));
});

describe('api', () => {
    test('has an HTTP get method', () => {
        apiClient.get('/test/endpoint', {
            params: {
                testparam: 'testy'
            }
        });

        expect(client.framePostClient.request).toBeCalledWith(
            UiAppRequestType.API_REQUEST,
            {
                method: IFrameApiRequestMethod.GET,
                resource: '/test/endpoint',
                options: {
                    params: {
                        testparam: 'testy'
                    }
                },
                body: null
            }
        );
    });

    test('has an HTTP post method', () => {
        apiClient.post('/test/endpoint', 'body');

        expect(client.framePostClient.request).toBeCalledWith(
            UiAppRequestType.API_REQUEST,
            {
                method: IFrameApiRequestMethod.POST,
                resource: '/test/endpoint',
                options: {},
                body: 'body'
            }
        );
    });

    test('has an HTTP put method', () => {
        apiClient.put('/test/endpoint', 'body');

        expect(client.framePostClient.request).toBeCalledWith(
            UiAppRequestType.API_REQUEST,
            {
                method: IFrameApiRequestMethod.PUT,
                resource: '/test/endpoint',
                options: {},
                body: 'body'
            }
        );
    });

    test('has an HTTP patch method', () => {
        apiClient.patch('/test/endpoint', 'body');

        expect(client.framePostClient.request).toBeCalledWith(
            UiAppRequestType.API_REQUEST,
            {
                method: IFrameApiRequestMethod.PATCH,
                resource: '/test/endpoint',
                options: {},
                body: 'body'
            }
        );
    });

    test('has an HTTP delete method', () => {
        apiClient.delete('/test/endpoint');

        expect(client.framePostClient.request).toBeCalledWith(
            UiAppRequestType.API_REQUEST,
            {
                method: IFrameApiRequestMethod.DELETE,
                resource: '/test/endpoint',
                options: {},
                body: null
            }
        );
    });

    test('propagates errors from framepost request method', async () => {
        client.framePostClient.request = jest.fn(() => {
            throw new Error('Something went wrong');
        });

        let error;

        try {
            await apiClient.get('/test/endpoint');
        } catch (e) {
            error = e;
        }

        expect(error.message).toEqual('Something went wrong');
    });
});
