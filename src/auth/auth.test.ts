import { UiAppRequestType, AuthStateStatus } from '../constants';
import { CustomAuthState } from '../types';
import { MockClient, mockContext } from '../utils/testUtils';

import { DDAuthClient } from './auth';

let client: MockClient;
let authClient: DDAuthClient;

beforeEach(() => {
    client = new MockClient();
    authClient = new DDAuthClient(client as any);
});

describe('authClient', () => {
    test('normal flow ', async () => {
        client.framePostClient.init(mockContext);
        const authStateCallback = jest.fn(() => ({
            isAuthenticated: true,
            args: { x: 123 }
        }));
        const sendSpy = jest
            .spyOn(client.framePostClient, 'send')
            .mockImplementation(() => {});

        const requestSpy = jest
            .spyOn(client.framePostClient, 'request')
            .mockImplementation(() => {});

        await authClient.setAuthStateProvider({
            url: 'https://domain.com',
            authStateCallback,
            retryInterval: 1000
        });
        expect(sendSpy).toHaveBeenCalledWith(
            UiAppRequestType.REQUEST_AUTH_STATE_BROADCAST,
            {
                status: AuthStateStatus.SET,
                args: {},
                isAuthenticated: false
            }
        );
        expect(authStateCallback).not.toHaveBeenCalled();
        let authState = await authClient.getAuthState();
        expect(authState).toEqual({
            status: AuthStateStatus.SUCCESS,
            isAuthenticated: true,
            args: { x: 123 }
        });
        expect(authStateCallback).toHaveBeenCalled();
        authState = await authClient.authenticateWithPopup();
        expect(authState).toEqual({
            status: AuthStateStatus.SUCCESS,
            isAuthenticated: true,
            args: { x: 123 }
        });
        expect(requestSpy).toHaveBeenCalledWith(
            UiAppRequestType.AUTH_WITH_POPUP_INIT,
            {
                authUrl: 'https://domain.com'
            }
        );
        authState = await authClient.getAuthState();
        expect(authState).toEqual({
            status: AuthStateStatus.SUCCESS,
            isAuthenticated: true,
            args: { x: 123 }
        });
    });
});
