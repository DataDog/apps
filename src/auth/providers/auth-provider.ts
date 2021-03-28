import type { AuthProviderType, AuthStatePersistance } from '../../constants';

export interface AuthProviderOptions {
    url: string;
    persistance?: AuthStatePersistance;
    customPersistanceExpiry?: number;
    closePopupAfterAuth?: boolean;
}
export abstract class AuthProvider<O extends AuthProviderOptions = any> {
    readonly type: AuthProviderType;
    protected abstract readonly options: O;

    constructor(type: AuthProviderType) {
        this.type = type;
    }

    getOptions() {
        return this.options;
    }
}
