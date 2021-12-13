import { init } from '@datadog/ui-extensions-sdk';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { API_TOKEN_KEY, API_URL } from './api';

const client = init({
    // <<<WORKSHOP STEP 10>>>: Uncomment the code below to continue
    // authProvider: {
    //   url: `${API_URL}/login?redirect=${window.location.origin}/auth-redirect`,
    //   resolution: 'message',
    //   authStateCallback: () => {
    //     return localStorage.getItem(API_TOKEN_KEY) !== null;
    //   }
    // }
});

export default client;
