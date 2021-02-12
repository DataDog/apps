/* eslint-disable no-undef */
import type { ChildClient } from '@datadog/framepost';

import { UiAppRequestType } from '../constants';
import type { Context } from '../types';
import type { Logger } from '../utils/logger';

const getLocalStorageKeys = () => {
    // we cannot use because it doesn't work with the mocked localStorage Object.keys(window.localStorage)
    return [...Array(window.localStorage.length)].map((_, i) =>
        window.localStorage.key(i)
    );
};
export class DDSecretsClient {
    private readonly debug: boolean;
    private readonly framePostClient: ChildClient<Context>;
    private readonly logger: Logger;

    constructor(debug: boolean, logger: Logger, framePostClient: ChildClient) {
        this.debug = debug;
        this.logger = logger;
        this.framePostClient = framePostClient;

        this.registerRequestHandlers();
    }

    private registerRequestHandlers() {
        this.framePostClient.onRequest(
            UiAppRequestType.STORE_SECRET,
            this.handleStoreSecretRequest.bind(this)
        );

        this.framePostClient.onRequest(
            UiAppRequestType.LOAD_SECRET,
            this.handleLoadSecretRequest.bind(this)
        );

        this.framePostClient.onRequest(
            UiAppRequestType.LOAD_ALL_SECRETS,
            this.handleLoadAllSecretsRequest.bind(this)
        );

        this.framePostClient.onRequest(
            UiAppRequestType.REMOVE_ALL_SECRETS,
            this.handleRemoveAllSecretsRequest.bind(this)
        );

        this.framePostClient.onRequest(
            UiAppRequestType.REMOVE_SECRET,
            this.handleRemoveSecretRequest.bind(this)
        );
    }

    private handleStoreSecretRequest({ key, secret }: StoreSecretRequest) {
        try {
            window.localStorage.setItem(key, secret);
            return true;
        } catch (error) {
            // the user has disabled storage or if the quota has been exceeded
            return false;
        }
    }

    private handleLoadSecretRequest({ key }: LoadSecretRequest) {
        try {
            return window.localStorage.getItem(key);
        } catch (error) {
            // the user has disabled storage or if the quota has been exceeded
            return false;
        }
    }

    private handleLoadAllSecretsRequest({ prefix }: LoadAllSecretsRequest) {
        try {
            const keys = getLocalStorageKeys().filter(
                key => key && key.startsWith(prefix)
            );

            const result = keys.reduce((agg: any, key: string | null) => {
                agg[key!] = window.localStorage.getItem(key!);
                return agg;
            }, {});
            return result;
        } catch (error) {
            // the user has disabled storage or if the quota has been exceeded
            return false;
        }
    }

    private handleRemoveSecretRequest({ key }: RemoveSecretRequest) {
        try {
            window.localStorage.removeItem(key);
            return true;
        } catch (error) {
            // the user has disabled storage or if the quota has been exceeded
            return false;
        }
    }

    private handleRemoveAllSecretsRequest({ prefix }: RemoveAllSecretsRequest) {
        try {
            getLocalStorageKeys()
                .filter(key => key && key.startsWith(prefix))

                .forEach(key => key && window.localStorage.removeItem(key));

            return true;
        } catch (error) {
            // the user has disabled storage or if the quota has been exceeded
            return false;
        }
    }

    // returns a promises that resolves with the decrypted secret for a given key
    async get(key: string) {
        return this.framePostClient.request(UiAppRequestType.GET_SECRET, key);
    }

    async set(key: string, data: string) {
        return this.framePostClient.request(UiAppRequestType.SET_SECRET, {
            key,
            data
        });
    }

    async remove(key: string) {
        return this.framePostClient.request(
            UiAppRequestType.REMOVE_SECRET_PUBLIC,
            key
        );
    }

    // returns a promises that resolves with the params passed to the redirection url after a successful auth
    // Throws an error if the params were not received within 30 seconds
    async requestAuthTokens(authUrl: string): Promise<URLSearchParams> {
        const paramsString = await this.framePostClient.request(
            UiAppRequestType.REQUEST_AUTH_TOKENS,
            authUrl
        );
        return new URLSearchParams(paramsString);
    }
}

export interface StoreSecretRequest {
    key: string;
    secret: string;
}

export interface LoadAllSecretsRequest {
    prefix: string;
}
export interface RemoveAllSecretsRequest {
    prefix: string;
}

export interface LoadSecretRequest {
    key: string;
}
export interface RemoveSecretRequest {
    key: string;
}
