import type { ChildClient } from '@datadog/framepost';

import { UiAppRequestType } from '../constants';
import type { Context } from '../types';
import type { Logger } from '../utils/logger';

export class DDAuthClient {
    private readonly debug: boolean;
    private readonly framePostClient: ChildClient<Context>;
    private readonly logger: Logger;

    constructor(debug: boolean, logger: Logger, framePostClient: ChildClient) {
        this.debug = debug;
        this.logger = logger;
        this.framePostClient = framePostClient;
    }

    // returns a promises that resolves with the params passed to the redirection url after a successful auth
    // Throws an error if the params were not received within 30 seconds
    async requestAuthTokens(
        authUrl: string,
        redirectUrlOrigin: string
    ): Promise<URLSearchParams> {
        const paramsString = await this.framePostClient.request(
            UiAppRequestType.REQUEST_AUTH_TOKENS,
            { authUrl, redirectUrlOrigin }
        );
        return new URLSearchParams(paramsString);
    }

    // returns a promises that resolves with the params passed to the redirection url after a successful auth
    // Throws an error if the params were not received within 30 seconds
    resolveAuthTokens() {
        // eslint-disable-next-line no-undef
        const paramsString = window.location.search;
        this.framePostClient.onRequest(
            UiAppRequestType.REQUEST_AUTH_TOKENS,
            () => paramsString
        );
    }
}
