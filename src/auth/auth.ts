import type { DDClient } from '../client/client';
import { UiAppRequestType, AuthStateStatus } from '../constants';
import { AuthState, CustomAuthState } from '../types';

import {
    BasicAuthProvider,
    CustomAuthProvider,
    isCustomAuthProvider
} from './providers';

const defaultAuthState: Required<AuthState> = {
    isAuthenticated: false,
    status: AuthStateStatus.NONE,
    args: {}
};

export class DDAuthClient {
    private readonly client: DDClient;
    private authState: AuthState;
    private authProvider?: BasicAuthProvider | CustomAuthProvider;

    constructor(client: DDClient) {
        this.client = client;
        this.authState = defaultAuthState;
    }

    async setProvider(authProvider: BasicAuthProvider | CustomAuthProvider) {
        await this.client.getContext();

        if (this.authState.status === AuthStateStatus.INITIATED) {
            throw new Error(
                'Another auth flow is in progress. Please wait for the other flow to fail or succeed before trying again.'
            );
        }

        this.authProvider = authProvider;
        this.updateAuthState({ status: AuthStateStatus.SET });

        // as soon as the provider is set, we execute the callback in case is the user is already authenticated due to a pre-existing condition like a cookie
        if (isCustomAuthProvider(this.authProvider)) {
            await this.checkCustomAuthState();
        }
    }

    updateAuthState(newAuthState: Partial<AuthState>) {
        this.authState = {
            ...defaultAuthState,
            ...newAuthState
        };

        this.client.framePostClient.send(
            UiAppRequestType.REQUEST_AUTH_STATE_BROADCAST,
            this.authState
        );
    }

    async getAuthState(): Promise<AuthState> {
        await this.client.getContext();
        return this.authState;
    }

    // Returns a promises that resolves with the params passed to the redirection url after a successful auth
    // Throws an error if the popup window was blocked out or if the user did not consent within 5 minutes
    // The counterpart to resolveAuthTokens()
    async requestAuthTokens(
        authUrl: string,
        redirectUrlOrigin: string
    ): Promise<URLSearchParams> {
        const paramsString = await this.client.framePostClient.request(
            UiAppRequestType.REQUEST_AUTH_TOKENS,
            { authUrl, redirectUrlOrigin }
        );
        return new URLSearchParams(paramsString);
    }

    // Pass the URL query params. Must be called in a popup window opened by requestAuthTokens()
    // The counterpart to requestAuthTokens()
    resolveAuthTokens(paramsString: string) {
        this.client.framePostClient.onRequest(
            UiAppRequestType.REQUEST_AUTH_TOKENS,
            () => paramsString
        );
    }

    async authenticateWithPopup(): Promise<AuthState> {
        if (
            !this.authProvider ||
            this.authState.status === AuthStateStatus.NONE
        ) {
            throw new Error(
                'Please set the Auth Provider before using this functionality.'
            );
        }
        if (this.authState.status === AuthStateStatus.INITIATED) {
            throw new Error(
                'Another auth flow is in progress. Please wait for the other flow to fail or succeed before trying again.'
            );
        }

        if (this.authProvider && isCustomAuthProvider(this.authProvider)) {
            await this.client.framePostClient.request(
                UiAppRequestType.AUTH_WITH_POPUP_INIT,
                {
                    authUrl: this.authProvider.getOptions().url,
                    providerType: this.authProvider.type
                }
            );

            const checkAndRetry = async () => {
                const authState = await this.checkCustomAuthState();
                if (authState.isAuthenticated) {
                    if (this.authProvider!.getOptions().closePopupAfterAuth) {
                        try {
                            await this.client.framePostClient.request(
                                UiAppRequestType.AUTH_WITH_POPUP_CLOSE
                            );

                            this.client.logger.log('auth popup closed');
                        } catch (e) {
                            // if this specific request failed, likely due to a timeout, let's catch it and continue because it has a trivial impact
                            this.client.logger.error(
                                `Unable to close auth popup. Error: ${e.message}`
                            );
                        }
                    }
                } else {
                    setTimeout(checkAndRetry, 2000);
                }
            };

            checkAndRetry();

            return new Promise(resolve => {
                const timeout = setTimeout(() => {
                    clearTimeout(timeout);
                    clearInterval(interval);
                    const newAuthState = {
                        ...defaultAuthState,
                        status: AuthStateStatus.FAILED,
                        isAuthenticated: false
                    };

                    this.updateAuthState(newAuthState);
                    resolve(newAuthState);
                }, 5000);
                const interval = setInterval(async () => {
                    const authState = await this.checkCustomAuthState();
                    if (authState.isAuthenticated) {
                        if (
                            this.authProvider!.getOptions().closePopupAfterAuth
                        ) {
                            try {
                                await this.client.framePostClient.request(
                                    UiAppRequestType.AUTH_WITH_POPUP_CLOSE
                                );

                                this.client.logger.log('auth popup closed');
                            } catch (e) {
                                // if this specific request failed, likely due to a timeout, let's catch it and continue because it has a trivial impact
                                this.client.logger.error(
                                    `Unable to close auth popup. Error: ${e.message}`
                                );
                            }
                        }
                        clearInterval(interval);
                        clearTimeout(timeout);
                        resolve({
                            ...authState,
                            status: AuthStateStatus.SUCCESS
                        });
                    }
                }, 2000);
            });
        }

        return this.authState;
    }

    public async checkCustomAuthState() {
        if (!isCustomAuthProvider(this.authProvider)) {
            throw new Error(
                'This functionality is only provided if a Custom Auth Provider is set.'
            );
        }
        const authState = await this.authProvider.resolveAuthState();
        if (authState.isAuthenticated) {
            this.updateAuthState({
                status: AuthStateStatus.SUCCESS,
                ...authState
            });
        }

        return authState;
    }

    resolveAuthState(authState: CustomAuthState) {
        this.client.framePostClient.onRequest(
            UiAppRequestType.AUTH_WITH_POPUP_INIT,
            () => authState
        );
    }
}
