import * as datadogAPIClient from '@datadog/datadog-api-client';
import {
    Configuration,
    HttpLibrary,
    RequestContext,
    ResponseBody,
    ResponseContext
} from '@datadog/datadog-api-client/dist/packages/datadog-api-client-v1';
import * as uiExtensionsSDK from '@datadog/ui-extensions-sdk';

/**
 * We attempt to convert from what the API client has for HTTP methods,
 * to what the SDK uses for HTTP methods.
 * This is a lossy conversion since the SDK doesn't support all HTTP methods.
 *
 * @param method The API client method to parse.
 */
function parseHTTPMethod(
    method: datadogAPIClient.v1.HttpMethod
): uiExtensionsSDK.ApiRequestMethod | undefined {
    switch (method) {
        case datadogAPIClient.v1.HttpMethod.CONNECT:
            return;
        case datadogAPIClient.v1.HttpMethod.DELETE:
            return 'DELETE';
        case datadogAPIClient.v1.HttpMethod.GET:
            return 'GET';
        case datadogAPIClient.v1.HttpMethod.HEAD:
            return;
        case datadogAPIClient.v1.HttpMethod.OPTIONS:
            return;
        case datadogAPIClient.v1.HttpMethod.PATCH:
            return 'PATCH';
        case datadogAPIClient.v1.HttpMethod.POST:
            return 'POST';
        case datadogAPIClient.v1.HttpMethod.PUT:
            return 'PUT';
        case datadogAPIClient.v1.HttpMethod.TRACE:
            return;
    }
}

/**
 * We convert from whatever response we get from the SDK,
 * to what the API client expects.
 *
 * @param response Anything coming from the SDK.
 */
function parseResponseBody(response: unknown): ResponseBody {
    return {
        binary: async (): Promise<Buffer> => {
            // TODO: Converting to a string just to convert to a `Buffer` seems not quite right.
            return new Buffer(JSON.stringify(response));
        },
        text: async (): Promise<string> => {
            return JSON.stringify(response);
        }
    };
}

/**
 * We convert from what the API client has for a URL,
 * to what the SDK uses for URL information.
 *
 * @param rawURL The raw URL to use for parsing out any query string params.
 */
function parseURL(
    rawURL: string
): { url: string; params: Record<string, string> } {
    try {
        const parsed = new URL(rawURL);
        const params: Record<string, string> = {};
        parsed.searchParams.forEach((value: string, key: string): void => {
            params[key] = value;
        });

        return {
            params,
            url: parsed.pathname
        };
    } catch (error: unknown) {
        return {
            params: {},
            url: rawURL
        };
    }
}

/**
 * This is the bulk of the integration with `@datadog/datadog-api-client`.
 * We massage between what the SDK has ability to do,
 * and what the API client needs.
 *
 * @param client The SDK client to use for making requests.
 * @returns An implementation of {@link HttpLibrary.send} that can be used for {@link Configuration}.
 */
function send(client: uiExtensionsSDK.DDClient): HttpLibrary['send'] {
    return async (request: RequestContext): Promise<ResponseContext> => {
        const method = parseHTTPMethod(request.getHttpMethod());
        const parsed = parseURL(request.getUrl());

        try {
            const response = await client.api.request(parsed.url, {
                contentType: 'json',
                data: request.getBody(),
                method,
                params: parsed.params
            });
            const body = parseResponseBody(response);

            // TODO: We should give the actual status code.
            return new datadogAPIClient.v1.ResponseContext(200, {}, body);
        } catch (error) {
            const body = parseResponseBody(error);

            // TODO: We should give the actual status code.
            return new datadogAPIClient.v1.ResponseContext(500, {}, body);
        }
    };
}

/**
 * Creates a {@link Configuration} for V1 APIs.
 *
 * @param client The SDK client to use.
 */
function createV1Configuration(
    client: uiExtensionsSDK.DDClient
): Configuration {
    return datadogAPIClient.v1.createConfiguration({
        httpApi: {
            debug: client.debug,
            send: send(client)
        }
    });
}

export { createV1Configuration };
