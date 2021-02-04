import type { ChildClient } from '@datadog/framepost';

import { UiAppRequestType } from '../constants';
import type { Context } from '../types';
import type { Logger } from '../utils/logger';

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
            // eslint-disable-next-line no-undef
            window.localStorage.setItem(key, secret);
            return true;
        } catch (error) {
            // the user has disabled storage or if the quota has been exceeded
            return false;
        }
    }

    private handleGetSecretRequest({ key }: GetSecretRequest) {
        try {
            // eslint-disable-next-line no-undef
            return window.localStorage.getItem(key);
        } catch (error) {
            // the user has disabled storage or if the quota has been exceeded
            return false;
        }
    }

    private handleGetAllSecretsRequest({ prefix }: GetAllSecretsRequest) {
        try {
            // eslint-disable-next-line no-undef
            const keys = Object.keys(localStorage).filter(key =>
                key.startsWith(prefix)
            );
            const result = keys.reduce((agg: any, key: string) => {
                // eslint-disable-next-line no-undef
                agg[key] = window.localStorage.getItem(key);
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
            // eslint-disable-next-line no-undef
            window.localStorage.removeItem(key);
            return true;
        } catch (error) {
            // the user has disabled storage or if the quota has been exceeded
            return false;
        }
    }

    private handleRemoveAllSecretsRequest({ prefix }: RemoveAllSecretsRequest) {
        try {
            // eslint-disable-next-line no-undef
            Object.keys(localStorage)
                .filter(key => key.startsWith(prefix))
                // eslint-disable-next-line no-undef
                .forEach(key => window.localStorage.removeItem(key));

            return true;
        } catch (error) {
            // the user has disabled storage or if the quota has been exceeded
            return false;
        }
    }

    async loadPrivateSecret(key: string) {
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
