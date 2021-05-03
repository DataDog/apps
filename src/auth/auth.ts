import type { DDClient } from '../client/client';
import { UiAppRequestType } from '../constants';
import { AuthState, AuthProviderOptions } from '../types';

const defaultAuthState: Required<AuthState> = {
    isAuthenticated: false,
    args: {}
};
export class DDAuthClient {
    private readonly client: DDClient;
    private authState: AuthState;
    readonly options?: AuthProviderOptions;

    constructor(client: DDClient, options?: AuthProviderOptions) {
        this.client = client;
        this.authState = defaultAuthState;
        if (options) {
            this.options = options;
        }

        this.client.framePostClient.onRequest(
            UiAppRequestType.CHECK_AUTH_STATE,
            this.checkAuthState.bind(this)
        );
    }

    private async checkAuthState(): Promise<AuthState | null> {
        if (!this.options) {
            this.client.logger.error('Auth Provider is not set');
            return null;
        }
        const rawState = await this.options.authStateCallback();
        if (typeof rawState === 'boolean') {
            return { isAuthenticated: rawState };
        }
        return rawState;
    }

    async getAuthState(): Promise<AuthState> {
        await this.client.getContext();
        return this.client.framePostClient.request(
            UiAppRequestType.GET_AUTH_STATE,
            { forceUpdate: false }
        );
    }

    async updateAuthState() {
        await this.client.getContext();
        return this.client.framePostClient.request(
            UiAppRequestType.GET_AUTH_STATE,
            { forceUpdate: true }
        );
    }
}

export const resolveAuthFlow = (state: AuthState) => {
    if (window.opener) {
        window.opener.postMessage(state, '*');
    }
};
