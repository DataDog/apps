import type { ChildClient } from '@datadog/framepost';

import { UiAppRequestType, IFrameApiRequestMethod } from '../constants';
import type {
    Context,
    IFrameApiRequest,
    IframeApiRequestOptions
} from '../types';
import type { Logger } from '../utils/logger';

import { DDAPIV1Client } from './v1';

export class DDAPIClient {
    readonly v1: DDAPIV1Client;
    private readonly debug: boolean;
    private readonly framePostClient: ChildClient<Context>;
    private readonly logger: Logger;

    constructor(debug: boolean, logger: Logger, framePostClient: ChildClient) {
        this.debug = debug;
        this.logger = logger;
        this.framePostClient = framePostClient;

        this.v1 = new DDAPIV1Client(this);
    }

    private async request<Q = any, R = any>(
        req: IFrameApiRequest<Q>
    ): Promise<R> {
        return this.framePostClient.request<IFrameApiRequest<Q>, R>(
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
