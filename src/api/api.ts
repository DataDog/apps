import type { DDClient } from '../client/client';
import { UiAppRequestType } from '../constants';
import type { ApiRequest, ApiRequestOptions } from '../types';

export class DDAPIClient {
    private readonly client: DDClient;

    constructor(client: DDClient) {
        this.client = client;
    }

    async request<Q = any, R = any>(
        resource: string,
        {
            method = 'GET',
            params = {},
            data,
            contentType = 'json'
        }: ApiRequestOptions<Q>
    ): Promise<R> {
        return this.client.framePostClient.request<ApiRequest<Q>, R>(
            UiAppRequestType.API_REQUEST,
            {
                resource,
                method,
                params,
                data,
                contentType
            }
        );
    }

    async get<R = any>(
        resource: string,
        options: Omit<
            ApiRequestOptions<undefined>,
            'method' | 'data' | 'contentType'
        > = {}
    ): Promise<R> {
        return this.request<undefined, R>(resource, {
            method: 'GET',
            ...options
        });
    }

    async post<Q = any, R = any>(
        resource: string,
        data: Q,
        options: Omit<ApiRequestOptions<Q>, 'method' | 'data'> = {}
    ): Promise<R> {
        return this.request<Q, R>(resource, {
            method: 'POST',
            data,
            ...options
        });
    }

    async put<Q = any, R = any>(
        resource: string,
        data: Q,
        options: Omit<ApiRequestOptions<Q>, 'method' | 'data'> = {}
    ): Promise<R> {
        return this.request<Q, R>(resource, {
            method: 'PUT',
            data,
            ...options
        });
    }

    async patch<Q = any, R = any>(
        resource: string,
        data: Q,
        options: Omit<ApiRequestOptions<Q>, 'method' | 'data'> = {}
    ): Promise<R> {
        return this.request<Q, R>(resource, {
            method: 'PATCH',
            data,
            ...options
        });
    }

    async delete<R = any>(
        resource: string,
        options: Omit<
            ApiRequestOptions<undefined>,
            'method' | 'data' | 'contentType'
        > = {}
    ): Promise<R> {
        return this.request<undefined, R>(resource, {
            method: 'DELETE',
            ...options
        });
    }
}
