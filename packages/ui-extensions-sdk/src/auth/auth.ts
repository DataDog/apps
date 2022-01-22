import type { DDClient } from '../client/client';
import { RequestType } from '../constants';
import { AuthState, AuthStateOptions } from '../types';

const defaultAuthState: Required<AuthState<unknown>> = {
    isAuthenticated: false,
    args: {}
};
export class DDAuthClient<AuthStateArgs = unknown> {
    private readonly client: DDClient;
    private authState: AuthState<AuthStateArgs>;
    readonly options?: AuthStateOptions<AuthStateArgs>;

    constructor(
        client: DDClient<AuthStateArgs>,
        options?: AuthStateOptions<AuthStateArgs>
    ) {
        this.client = client;
        this.authState = defaultAuthState as AuthState<AuthStateArgs>;
        if (options) {
            this.options = options;
        }

        this.client.onRequest(
            RequestType.CHECK_AUTH_STATE,
            this.checkAuthState.bind(this)
        );
    }

    private async checkAuthState(): Promise<AuthState<AuthStateArgs> | null> {
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

    async getAuthState(): Promise<AuthState<AuthStateArgs>> {
        await this.client.getContext();
        return this.client.request(RequestType.GET_AUTH_STATE, {
            forceUpdate: false
        });
    }

    async updateAuthState() {
        await this.client.getContext();
        return this.client.request(RequestType.GET_AUTH_STATE, {
            forceUpdate: true
        });
    }
}

export const resolveAuthFlow = <AuthStateArgs>(
    state: AuthState<AuthStateArgs>
) => {
    if (window.opener) {
        window.opener.postMessage(state, '*');
    }
};
