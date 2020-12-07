import type { ChildClient } from '@datadog/framepost';

import {
    UiAppRequestType,
    IFrameApiRequestMethod,
    IFrameApiRequestErrorType
} from './constants';
import type { Logger } from './logger';
import type {
    Context,
    IFrameApiRequest,
    IframeApiRequestOptions
} from './types';

export class DDAPIClient {
    private readonly debug: boolean;
    private readonly framePostClient: ChildClient<Context>;
    private readonly logger: Logger;

    constructor(debug: boolean, logger: Logger, framePostClient: ChildClient) {
        this.debug = debug;
        this.logger = logger;
        this.framePostClient = framePostClient;
    }

    private async request<Q = any, R = any>(
        req: IFrameApiRequest<Q>
    ): Promise<R> {
        const response = await this.framePostClient.request<
            IFrameApiRequest<Q>,
            any
        >(UiAppRequestType.API_REQUEST, req);

        if (response.isError) {
            if (response.type === IFrameApiRequestErrorType.FAILED_REQUEST) {
                throw response.data;
            }

            throw new Error(response.message);
        }

        return response as R;
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
            body: null
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
            body: null
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
            body: null
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
