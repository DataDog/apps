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

    // Returns a promises that resolves with the params passed to the redirection url after a successful auth
    // Throws an error if the popup window was blocked out or if the user did not consent within 5 minutes
    // The counterpart to resolveAuthTokens()
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

    // Pass the URL query params. Must be called in a popup window opened by requestAuthTokens()
    // The counterpart to requestAuthTokens()
    resolveAuthTokens() {
        // eslint-disable-next-line no-undef
        const paramsString = window.location.search;
        this.framePostClient.onRequest(
            UiAppRequestType.REQUEST_AUTH_TOKENS,
            () => paramsString
        );
    }
}
