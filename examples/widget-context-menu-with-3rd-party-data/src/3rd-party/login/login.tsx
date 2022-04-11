import { DDClient } from '@datadog/ui-extensions-sdk';
import ReactDOM from 'react-dom';
import * as React from 'react';
import { loginUser, User } from '../user';

type LoginProps = {
    client: DDClient;
};

/**
 * This component renders the login page for people to authenticate.
 *
 * This is not really part of the Datadog App.
 * This should be replaced with what the third-party service uses to authenticate.
 */
function Login(props: LoginProps): JSX.Element {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleUsername = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setUsername(event.target.value);
    };
    const handlePassword = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setPassword(event.target.value);
    };

    /**
     * Simulate the actual login.
     */
    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        /**
         * Stop the form from submitting since we're simulating the login.
         * Whether you need to do this in your service depends on how login is implemented.
         */
        event.preventDefault();

        /**
         * Replace this with the actual behavior to log in the user.
         */
        const user: User | undefined = await loginUser({
            password,
            username
        });

        if (user == null) {
            /**
             * The login credentials were not valid.
             * Set any validation errors and exit early.
             */
            return;
        }

        /**
         * The login credentials were valid.
         * We close the window to signify successful authentication.
         */
        window.close();
    };

    return (
        <>
            <h2>3rd-party login</h2>
            <p>Replace this page with your actual login page.</p>
            <form
                onSubmit={handleSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                }}
            >
                <label style={{ display: 'flex', gap: '0.25rem' }}>
                    <span style={{ width: '5rem' }}>Username:</span>
                    <input
                        onChange={handleUsername}
                        type="text"
                        value={username}
                    />
                </label>

                <label style={{ display: 'flex', gap: '0.25rem' }}>
                    <span style={{ width: '5rem' }}>Password:</span>
                    <input
                        onChange={handlePassword}
                        type="password"
                        value={password}
                    />
                </label>

                <input style={{ width: '5rem' }} type="submit" value="Login" />
            </form>
        </>
    );
}

function renderLogin(client: DDClient) {
    ReactDOM.render(
        <React.StrictMode>
            <Login client={client} />
        </React.StrictMode>,
        document.getElementById('root')
    );
}

export { renderLogin };
