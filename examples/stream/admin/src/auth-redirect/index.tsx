import * as React from 'react';
import { API_TOKEN_KEY } from '../api';
import { resolveAuthFlow } from '@datadog/ui-extensions-sdk';

export default function AuthRedirect() {
    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        const token = params.get('token');

        if (token) {
            localStorage.setItem(API_TOKEN_KEY, token);

            resolveAuthFlow({
                isAuthenticated: true
            })
        } else {
            resolveAuthFlow({
                isAuthenticated: false
            })
        }
    }, []);

    return null;
}