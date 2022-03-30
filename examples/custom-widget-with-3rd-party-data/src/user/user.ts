import { getPosts, Post } from '../post';

/**
 * The {@link Credentials} are used to authenticate.
 */
type Credentials = {
    password: string;
    username: string;
};

/**
 * The {@link User} represents the concept of a user in the 3rd-party service.
 * This can have any data and doesn't necessarily relate to a Datadog User.
 */
type User = {
    posts: Post[];
    username: string;
};

const usernameKey: string = 'username';

/**
 * This function asks the 3rd-party service for the currently logged in {@link User}.
 *
 * @returns The {@link User} if they're logged in and {@link undefined} if not.
 */
function getUser(): Promise<User | undefined> {
    return new Promise((resolve: (user?: User) => void) => {
        /**
         * Simulate a request to the server to get the logged-in user.
         */
        setTimeout(async () => {
            const username = window.localStorage.getItem(usernameKey);
            if (username == null) {
                resolve();
                return;
            }

            const posts = await getPosts(username);
            resolve({
                posts,
                username
            });
        }, 100);
    });
}

/**
 * This function asks the 3rd-party service to authenticate with the given credentials.
 *
 * @returns The {@link User} if they're login was successful and {@link undefined} if not.
 */
function loginUser(credentials: Credentials): Promise<User | undefined> {
    return new Promise((resolve: (user?: User) => void): void => {
        /**
         * Simulate a request to the server to check login credentials.
         * We always succeed only for illustrative purposes.
         */
        setTimeout(async () => {
            window.localStorage.setItem(usernameKey, credentials.username);
            const user = await getUser();
            resolve(user);
        }, 100);
    });
}

/**
 * This function asks the 3rd-party service do de-authenticate the currently logged in {@link User}.
 */
function logoutUser(): Promise<void> {
    return new Promise((resolve: () => void): void => {
        /**
         * Simulate a request to the server to log out the current user.
         */
        setTimeout((): void => {
            window.localStorage.removeItem(usernameKey);
            resolve();
        }, 100);
    });
}

export { getUser, loginUser, logoutUser };
export type { User };
