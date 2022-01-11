import { RequestType } from '../constants';
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
            RequestType.API_REQUEST,
            {
                method: 'GET',
                resource: '/test/endpoint',
                contentType: 'json',
                params: {
                    testparam: 'testy'
                },
                data: undefined
            }
        );
    });

    test('has an HTTP post method', () => {
        apiClient.post('/test/endpoint', 'data');

        expect(client.framePostClient.request).toBeCalledWith(
            RequestType.API_REQUEST,
            {
                method: 'POST',
                resource: '/test/endpoint',
                contentType: 'json',
                params: {},
                data: 'data'
            }
        );
    });

    test('has an HTTP put method', () => {
        apiClient.put('/test/endpoint', 'data');

        expect(client.framePostClient.request).toBeCalledWith(
            RequestType.API_REQUEST,
            {
                method: 'PUT',
                resource: '/test/endpoint',
                contentType: 'json',
                params: {},
                data: 'data'
            }
        );
    });

    test('has an HTTP patch method', () => {
        apiClient.patch('/test/endpoint', 'data');

        expect(client.framePostClient.request).toBeCalledWith(
            RequestType.API_REQUEST,
            {
                method: 'PATCH',
                resource: '/test/endpoint',
                contentType: 'json',
                params: {},
                data: 'data'
            }
        );
    });

    test('has an HTTP delete method', () => {
        apiClient.delete('/test/endpoint');

        expect(client.framePostClient.request).toBeCalledWith(
            RequestType.API_REQUEST,
            {
                method: 'DELETE',
                resource: '/test/endpoint',
                contentType: 'json',
                params: {},
                data: undefined
            }
        );
    });

    test('propagates errors from framepost request method', async () => {
        client.framePostClient.request = jest.fn(() => {
            throw new Error('Something went wrong');
        });

        await expect(apiClient.get('/test/endpoint')).rejects.toHaveProperty(
            'message',
            'Something went wrong'
        );
    });
});
