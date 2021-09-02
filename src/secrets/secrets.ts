/* eslint-disable no-undef */
import type { DDClient } from '../client/client';
import { RequestType } from '../constants';

const getLocalStorageKeys = () => {
    // we cannot use Obbjey.keys because it doesn't work with the mocked localStorage Object.keys(window.localStorage)
    return [...Array(window.localStorage.length)].map((_, i) =>
        window.localStorage.key(i)
    );
};
export class DDSecretsClient {
    private readonly client: DDClient;

    constructor(client: DDClient) {
        this.client = client;

        this.registerRequestHandlers();
    }

    private registerRequestHandlers() {
        this.client.framePostClient.onRequest(
            RequestType.STORE_SECRET,
            this.handleStoreSecretRequest.bind(this)
        );

        this.client.framePostClient.onRequest(
            RequestType.LOAD_SECRET,
            this.handleLoadSecretRequest.bind(this)
        );

        this.client.framePostClient.onRequest(
            RequestType.LOAD_ALL_SECRETS,
            this.handleLoadAllSecretsRequest.bind(this)
        );

        this.client.framePostClient.onRequest(
            RequestType.REMOVE_ALL_SECRETS,
            this.handleRemoveAllSecretsRequest.bind(this)
        );

        this.client.framePostClient.onRequest(
            RequestType.REMOVE_SECRET,
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
        return this.client.framePostClient.request(RequestType.GET_SECRET, key);
    }

    async set(key: string, data: string) {
        return this.client.framePostClient.request(RequestType.SET_SECRET, {
            key,
            data
        });
    }

    async remove(key: string) {
        return this.client.framePostClient.request(
            RequestType.REMOVE_SECRET_PUBLIC,
            key
        );
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
