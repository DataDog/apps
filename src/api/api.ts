import type { DDClient } from '../client/client';
import { UiAppRequestType, IFrameApiRequestMethod } from '../constants';
import type { IFrameApiRequest, IframeApiRequestOptions } from '../types';

import { DDAPIV1Client } from './v1';

export class DDAPIClient {
    readonly v1: DDAPIV1Client;
    private readonly client: DDClient;

    constructor(client: DDClient) {
        this.client = client;

        this.v1 = new DDAPIV1Client(this);
    }

    private async request<Q = any, R = any>(
        req: IFrameApiRequest<Q>
    ): Promise<R> {
        return this.client.framePostClient.request<IFrameApiRequest<Q>, R>(
            UiAppRequestType.API_REQUEST,
            req
        );
    }

    async get<R = any>(
        resource: string,
        options: IframeApiRequestOptions = {}
    ): Promise<R> {
        return this.request({
            method: IFrameApiRequestMethod.GET,
            resource,
            options,
            body: null
        });
    }

    async post<Q = any, R = any>(
        resource: string,
        body: Q,
        options: IframeApiRequestOptions = {}
    ): Promise<R> {
        return this.request({
            method: IFrameApiRequestMethod.POST,
            resource,
            options,
            body
        });
    }

    async put<Q = any, R = any>(
        resource: string,
        body: Q,
        options: IframeApiRequestOptions = {}
    ): Promise<R> {
        return this.request({
            method: IFrameApiRequestMethod.PUT,
            resource,
            options,
            body
        });
    }

    async patch<Q = any, R = any>(
        resource: string,
        body: Q,
        options: IframeApiRequestOptions = {}
    ): Promise<R> {
        return this.request({
            method: IFrameApiRequestMethod.PATCH,
            resource,
            options,
            body
        });
    }

    async delete<R = any>(
        resource: string,
        options: IframeApiRequestOptions = {}
    ): Promise<R> {
        return this.request({
            method: IFrameApiRequestMethod.DELETE,
            resource,
            options,
            body: null
        });
    }
}
