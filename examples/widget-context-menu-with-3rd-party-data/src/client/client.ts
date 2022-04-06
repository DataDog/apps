import { DDClient, init } from '@datadog/ui-extensions-sdk';
import { getUser, User } from '../user';

/**
 * We initialize the {@link DDClient} in one place and use it throughout the App.
 * Having the {@link DDClient} initialized in one place helps centralize auth logic and provide better type inference.
 */
const client: DDClient = init({
    authProvider: {
        /**
         * The `authStateCallback` can be pretty simple,
         * but can do whatever you need to check the authentication status.
         * This should not be used to perform actual authentication,
         * only to get the current authentication status.
         *
         * In this case,
         * we grab the current user if they exist,
         * and return the appropriate `isAuthenticated` value.
         */
        authStateCallback: async (): Promise<boolean> => {
            const user: User | undefined = await getUser();
            return user != null;
        },
        /**
         * We use `'close'` so the login page can close the window to notify successful login.
         * Once that happens, the `authStateCallback` is invoked again to check the state.
         *
         * @see https://github.com/DataDog/apps/blob/-/docs/en/programming-model.md#authentication
         */
        resolution: 'close',
        /**
         * This where we want Datadog to direct users to authenticate.
         */
        url: '/login'
    }
});

export { client };
