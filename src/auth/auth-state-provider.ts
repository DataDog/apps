import type { AuthStateOptions, CustomAuthState } from '../types';

const defaultOptions: Partial<AuthStateOptions> = {
    closePopupAfterAuth: true,
    retryInterval: 5000,
    totalTimeout: 60000
};

export class AuthStateProvider {
    readonly options: AuthStateOptions;

    constructor(options: AuthStateOptions) {
        this.options = {
            ...defaultOptions,
            ...options
        };
    }

    public async checkAuthState(): Promise<CustomAuthState> {
        const rawState = await this.options.authStateCallback();
        if (typeof rawState === 'boolean') {
            return { isAuthenticated: rawState };
        }
        return rawState;
    }
}
