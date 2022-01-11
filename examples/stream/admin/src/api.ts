export const API_URL = 'http://localhost:3001';

export const API_TOKEN_KEY = 'API_TOKEN';

const request = async <T = unknown>(
    path: string,
    options: RequestInit
): Promise<T> => {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const apiToken = localStorage.getItem(API_TOKEN_KEY);

    const defaultOptions: Partial<RequestInit> = {
        headers: {
            Accept: 'application/json'
            // <<<WORKSHOP STEP 9>>>: Please un-comment the code below
            // 'Authorization': `Bearer ${apiToken || ''}`
        }
    };

    const response = await fetch(`${API_URL}/${path}`, {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers
        }
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return (await response.json()) as T;
};

export const get = <T = unknown>(path: string) =>
    request<T>(path, {
        method: 'GET'
    });

export const post = <Req = unknown, Res = unknown>(path: string, body: Req) =>
    request<Res>(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

export const del = <Req = unknown, Res = unknown>(path: string, body: Req) =>
    request<Res>(path, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
