/* eslint-disable no-undef */
import { AuthProviderType, AuthStatePersistance } from '../../constants';
import type { CustomAuthState, AuthState } from '../../types';

import { AuthProvider, AuthProviderOptions } from './auth-provider';

interface CustomAuthProviderOptions extends AuthProviderOptions {
    authStateCallback: () =>
        | Promise<CustomAuthState | boolean>
        | CustomAuthState
        | boolean;
    url: string;
}
const defaultOptions: Partial<CustomAuthProviderOptions> = {
    persistance: AuthStatePersistance.CURRENT_SESSION,
    closePopupAfterAuth: true
};
export class CustomAuthProvider extends AuthProvider<
    CustomAuthProviderOptions
> {
    protected readonly options: CustomAuthProviderOptions;
    constructor(options: CustomAuthProviderOptions) {
        super(AuthProviderType.CUSTOM);
        this.options = {
            ...defaultOptions,
            ...options
        };
    }

    async resolveAuthState(invalidate: boolean): Promise<CustomAuthState> {
        if (
            invalidate ||
            this.options.persistance !== AuthStatePersistance.CURRENT_SESSION
        ) {
            // TODO: invalidate
            const rawState = await this.getRawAuthState();
            this.dehydrateAuthState(rawState);
        }

        // TODO: support multiple apps
        const hydratedAuthStateString = window.sessionStorage.getItem(
            'authState'
        );
        if (hydratedAuthStateString) {
            const hydratedAuthState: AuthState = JSON.parse(
                hydratedAuthStateString
            );
            return hydratedAuthState;
        }

        const rawState = await this.getRawAuthState();
        this.dehydrateAuthState(rawState);
        return rawState;
    }

    private async getRawAuthState(): Promise<CustomAuthState> {
        const rawState = await this.options.authStateCallback();
        if (typeof rawState === 'boolean') {
            return { isAuthenticated: rawState };
        }
        return rawState;
    }

    private dehydrateAuthState(authState: CustomAuthState) {
        if (this.options.persistance === AuthStatePersistance.CURRENT_SESSION) {
            window.sessionStorage.setItem(
                'authState',
                JSON.stringify(authState)
            );
        }
    }
}

export const isCustomAuthProvider = (
    provider?: AuthProvider
): provider is CustomAuthProvider =>
    provider !== undefined && provider.type === AuthProviderType.CUSTOM;
