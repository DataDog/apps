/* eslint-disable no-undef */
import { AuthProviderType, AuthStatePersistance } from '../../constants';
import type { CustomAuthState } from '../../types';

import { AuthProvider, AuthProviderOptions } from './auth-provider';

export interface CustomAuthProviderOptions extends AuthProviderOptions {
    authStateCallback: () =>
        | Promise<CustomAuthState | boolean>
        | CustomAuthState
        | boolean;
}
const defaultOptions: Partial<CustomAuthProviderOptions> = {
    persistance: AuthStatePersistance.NONE,
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
        const rawState = await this.getRawAuthState();
        return rawState;
    }

    private async getRawAuthState(): Promise<CustomAuthState> {
        const rawState = await this.options.authStateCallback();
        if (typeof rawState === 'boolean') {
            return { isAuthenticated: rawState };
        }
        return rawState;
    }
}

export const isCustomAuthProvider = (
    provider?: AuthProvider
): provider is CustomAuthProvider =>
    provider !== undefined && provider.type === AuthProviderType.CUSTOM;

export const isCustomAuthProviderOptions = (
    options: AuthProviderOptions
): options is CustomAuthProviderOptions =>
    (options as CustomAuthProviderOptions).authStateCallback !== undefined;
