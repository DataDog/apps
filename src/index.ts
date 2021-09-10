import { DDClient } from './client/client';
import { Context, ClientOptions } from './types';

export { resolveAuthFlow } from './auth/auth';

let client: DDClient;

/**
 * Initializes a client, or returns an existing one if already initialized. User can provide an optional
 * callback to b de executed with app context data when it is sent from the parent.
 */
export const init = <AuthStateArgs = unknown>(
    options?: ClientOptions<AuthStateArgs>,
    callback?: (context: Context) => void
): DDClient<AuthStateArgs> => {
    if (!client) {
        client = new DDClient(options);
    }

    if (callback) {
        client.getContext().then(callback);
    }

    return client as DDClient<AuthStateArgs>;
};

export * from './types';
export * from './constants';

export { DDClient };
