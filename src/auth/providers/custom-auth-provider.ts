import { AuthProviderType, AuthStatePersistance } from '../../constants';
import type { CustomAuthState } from '../../types';

import { AuthProvider, AuthProviderOptions } from './auth-provider';

interface CustomAuthProviderOptions extends AuthProviderOptions {
    authStateCallback: () => Promise<CustomAuthState | boolean> | boolean;
    url: string;
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

    async resolveAuthState() {
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
