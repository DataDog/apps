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
            UiAppRequestType.SET_SECRET,
            this.handleSetSecretRequest.bind(this)
        );

        this.framePostClient.onRequest(
            UiAppRequestType.GET_SECRET,
            this.handleGetSecretRequest.bind(this)
        );

        this.framePostClient.onRequest(
            UiAppRequestType.GET_ALL_SECRETS,
            this.handleGetAllSecretsRequest.bind(this)
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

    private handleSetSecretRequest({ key, secret }: SetSecretRequest) {
        try {
            window.localStorage.setItem(key, secret);
            return true;
        } catch (error) {
            // the user has disabled storage or if the quota has been exceeded
            return false;
        }
    }

    private handleGetSecretRequest({ key }: GetSecretRequest) {
        try {
            return window.localStorage.getItem(key);
        } catch (error) {
            // the user has disabled storage or if the quota has been exceeded
            return false;
        }
    }

    private handleGetAllSecretsRequest({ prefix }: GetAllSecretsRequest) {
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

    // returns the decrypted secret for a given key
    async get(key: string) {
        return this.framePostClient.request(
            UiAppRequestType.DECRYPT_SECRET,
            key
        );
    }
}

export interface SetSecretRequest {
    key: string;
    secret: string;
}

export interface GetAllSecretsRequest {
    prefix: string;
}
export interface RemoveAllSecretsRequest {
    prefix: string;
}

export interface GetSecretRequest {
    key: string;
}
export interface RemoveSecretRequest {
    key: string;
}
