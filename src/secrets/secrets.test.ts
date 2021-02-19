import { UiAppRequestType } from '../constants';
import { mockContext, MockLocalStorage, MockClient } from '../utils/testUtils';

import { DDSecretsClient } from './secrets';

let client: MockClient;
let secretsClient: DDSecretsClient;
let mockStorage: MockLocalStorage;

beforeEach(() => {
    client = new MockClient();
    secretsClient = new DDSecretsClient(client as any);
});

describe('client.get', () => {
    it('sends a GET_SECRET request to the parent with the data to decrypt', async () => {
        client.framePostClient.init(mockContext);

        const requestMock = jest
            .spyOn(client.framePostClient, 'request')
            .mockImplementation(() => null);

        const response = await secretsClient.get('my-secret-key');
        expect(response).toEqual(null);
        expect(requestMock).toHaveBeenCalledWith(
            UiAppRequestType.GET_SECRET,
            'my-key'
        );
    });
});

describe('client.set', () => {
    it('sends a SET_SECRET request to the parent with the data to encrypt', async () => {
        client.framePostClient.init(mockContext);

        const requestMock = jest
            .spyOn(client.framePostClient, 'request')
            .mockImplementation(() => null);

        const response = await secretsClient.set('my-key', 'my-secret');
        expect(response).toEqual(null);
        expect(requestMock).toHaveBeenCalledWith(UiAppRequestType.SET_SECRET, {
            key: 'my-key',
            data: 'my-secret'
        });
    });
});

describe('client.remove', () => {
    it('sends a REMOVE_SECRET_PUBLIC request to the parent with the key to remove', async () => {
        client.framePostClient.init(mockContext);

        const requestMock = jest
            .spyOn(client.framePostClient, 'request')
            .mockImplementation(() => null);

        const response = await secretsClient.remove('my-key');
        expect(response).toEqual(null);
        expect(requestMock).toHaveBeenCalledWith(
            UiAppRequestType.REMOVE_SECRET_PUBLIC,
            'my-key'
        );
    });
});

describe('secrets request handlers', () => {
    beforeAll(() => {
        mockStorage = new MockLocalStorage();
        // eslint-disable-next-line no-undef
        Object.defineProperty(window, 'localStorage', {
            value: mockStorage
        });
        setItemMock = jest.spyOn(mockStorage, 'setItem');
        getItemMock = jest.spyOn(mockStorage, 'getItem');
        removeItemMock = jest.spyOn(mockStorage, 'removeItem');
    });
    beforeEach(() => mockStorage.clear());
    afterEach(() => jest.clearAllMocks());
    const key = 'my-key';
    const secret = 'my-secret';
    let setItemMock: jest.SpyInstance;
    let getItemMock: jest.SpyInstance;
    let removeItemMock: jest.SpyInstance;

    it('handles STORE_SECRET request when sent from the parent frame', () => {
        client.framePostClient.init();

        const result = client.framePostClient.mockRequest(
            UiAppRequestType.STORE_SECRET,
            {
                key,
                secret
            }
        );
        expect(result).toBe(true);
        expect(setItemMock).toHaveBeenCalledWith(key, secret);
        expect(mockStorage.getItem(key)).toEqual(secret);
    });

    it('handles LOAD_SECRET request when sent from the parent frame', () => {
        client.framePostClient.init();
        mockStorage.setItem(key, secret);

        const result = client.framePostClient.mockRequest(
            UiAppRequestType.LOAD_SECRET,
            {
                key
            }
        );
        expect(result).toBe(secret);
        expect(getItemMock).toHaveBeenCalledWith(key);
        expect(mockStorage.getItem(key)).toEqual(secret);
    });

    it('handles LOAD_ALL_SECRETS request when sent from the parent frame', () => {
        client.framePostClient.init();
        const prefix = 'my_app_prefix:';
        mockStorage.setItem(`${prefix}key_1`, 'secret_1');
        mockStorage.setItem(`${prefix}key_2`, 'secret_2');
        mockStorage.setItem('another_key', 'secret_3');

        const result = client.framePostClient.mockRequest(
            UiAppRequestType.LOAD_ALL_SECRETS,
            {
                prefix
            }
        );
        expect(result).toEqual({
            [`${prefix}key_1`]: 'secret_1',
            [`${prefix}key_2`]: 'secret_2'
        });
        expect(getItemMock).toHaveBeenNthCalledWith(1, `${prefix}key_1`);
        expect(getItemMock).toHaveBeenNthCalledWith(2, `${prefix}key_2`);
        expect(getItemMock).toBeCalledTimes(2);
        expect(mockStorage.getItem(`${prefix}key_1`)).toEqual('secret_1');
        expect(mockStorage.getItem(`${prefix}key_2`)).toEqual('secret_2');
    });

    it('handles REMOVE_SECRET request when sent from the parent frame', () => {
        client.framePostClient.init();
        mockStorage.setItem(key, secret);

        const result = client.framePostClient.mockRequest(
            UiAppRequestType.REMOVE_SECRET,
            {
                key
            }
        );
        expect(result).toEqual(true);
        expect(removeItemMock).toBeCalledTimes(1);
        expect(removeItemMock).toHaveBeenCalledWith(key);
        expect(mockStorage.getItem(key)).toBeNull();
    });

    it('handles REMOVE_ALL_SECRETS request when sent from the parent frame', () => {
        client.framePostClient.init();
        const prefix = 'my_app_prefix:';
        mockStorage.setItem(`${prefix}key_1`, 'secret_1');
        mockStorage.setItem(`${prefix}key_2`, 'secret_2');
        mockStorage.setItem('another_key', 'secret_3');

        const result = client.framePostClient.mockRequest(
            UiAppRequestType.REMOVE_ALL_SECRETS,
            {
                prefix
            }
        );
        expect(result).toEqual(true);
        expect(removeItemMock).toHaveBeenNthCalledWith(1, `${prefix}key_1`);
        expect(removeItemMock).toHaveBeenNthCalledWith(2, `${prefix}key_2`);
        expect(removeItemMock).toBeCalledTimes(2);
        expect(mockStorage.getItem(`${prefix}key_1`)).toBeNull();
        expect(mockStorage.getItem(`${prefix}key_2`)).toBeNull();
        expect(mockStorage.getItem('another_key')).toEqual('secret_3');
    });
});
