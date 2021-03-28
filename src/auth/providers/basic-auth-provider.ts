import { AuthProviderType } from '../../constants';

import { AuthProvider, AuthProviderOptions } from './auth-provider';

export interface BasicAuthProviderOptions extends AuthProviderOptions {}
export class BasicAuthProvider extends AuthProvider<BasicAuthProviderOptions> {
    readonly options: BasicAuthProviderOptions;
    constructor(options: BasicAuthProviderOptions) {
        super(AuthProviderType.BASIC);
        this.options = options;
    }
}

export const isBasicAuthProvider = (
    provider?: AuthProvider
): provider is BasicAuthProvider =>
    provider !== undefined && provider.type === AuthProviderType.BASIC;
