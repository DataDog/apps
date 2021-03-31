import type { DDClient } from '../client/client';
import { AuthStateStatus, UiAppRequestType } from '../constants';
import { AuthState } from '../types';

import { AuthStateProvider } from './auth-state-provider';

const defaultAuthState: Required<AuthState> = {
    isAuthenticated: false,
    status: AuthStateStatus.NONE,
    args: {}
};
export class DDAuthClient {
    private readonly client: DDClient;
    private authState: AuthState;
    private authStateProvider?: AuthStateProvider;

    constructor(client: DDClient) {
        this.client = client;
        this.authState = defaultAuthState;
    }

    // Public methods

    async setAuthStateProvider(options: AuthOptions) {
        await this.client.getContext();
        if (this.authState.status === AuthStateStatus.INITIATED) {
            throw new Error(
                'Another auth flow is in progress. Please wait for the other flow to fail or succeed before trying again.'
            );
        }

        this.authStateProvider = new AuthStateProvider(options);
        this.updateAuthState({ status: AuthStateStatus.SET });
    }

    async getAuthState(forceUpdate = false): Promise<AuthState> {
        await this.client.getContext();
        if (forceUpdate || this.authState.status === AuthStateStatus.SET) {
            const customAuthState = await this.authStateProvider!.checkAuthState();
            if (customAuthState.isAuthenticated) {
                const newAuthState = {
                    ...customAuthState,
                    status: AuthStateStatus.SUCCESS
                };
                this.updateAuthState(newAuthState);
                return newAuthState;
            }
        }

        return this.authState;
    }

    async authenticateWithPopup(): Promise<AuthState> {
        if (this.authState.status === AuthStateStatus.NONE) {
            throw new Error(
                'Auth State Provider is not set. Please use setAuthStateProvider() to set the provider before using this method.'
            );
        }
        if (this.authState.status === AuthStateStatus.INITIATED) {
            throw new Error(
                'Another auth flow is in progress. Please wait for the other flow to fail or succeed before trying again.'
            );
        }

        this.updateAuthState({ status: AuthStateStatus.INITIATED });

        await this.client.framePostClient.request(
            UiAppRequestType.AUTH_WITH_POPUP_INIT,
            {
                authUrl: this.authStateProvider!.options.url
            }
        );

        return new Promise(resolve => {
            const timeout = setTimeout(() => {
                clearTimeout(timeout);
                clearInterval(interval);
                const newAuthState = {
                    status: AuthStateStatus.FAILED,
                    isAuthenticated: false
                };

                this.updateAuthState(newAuthState);
                resolve(newAuthState);
            }, this.authStateProvider!.options.totalTimeout);

            const interval = setInterval(async () => {
                const customAuthState = await this.authStateProvider!.checkAuthState();
                if (customAuthState.isAuthenticated) {
                    if (this.authStateProvider!.options.closePopupAfterAuth) {
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
                    const newAuthState = {
                        ...customAuthState,
                        status: AuthStateStatus.SUCCESS
                    };
                    this.updateAuthState(newAuthState);
                    resolve(newAuthState);
                }
            }, 5000);
        });
    }

    public async updateCustomAuthState() {
        return this.getAuthState(true);
    }

    // Private methods

    private updateAuthState(changes: Partial<AuthState>) {
        const newAuthState = {
            ...defaultAuthState,
            ...changes
        };

        // todo: do a diff instead to catch other changes
        if (newAuthState.status !== this.authState.status) {
            this.client.framePostClient.send(
                UiAppRequestType.REQUEST_AUTH_STATE_BROADCAST,
                newAuthState
            );
        }

        this.authState = newAuthState;
    }
}
