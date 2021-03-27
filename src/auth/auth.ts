import type { DDClient } from '../client/client';
import { UiAppRequestType } from '../constants';

export class DDAuthClient {
    private readonly client: DDClient;

    constructor(client: DDClient) {
        this.client = client;
    }

    // Returns a promises that resolves with the params passed to the redirection url after a successful auth
    // Throws an error if the popup window was blocked out or if the user did not consent within 5 minutes
    // The counterpart to resolveAuthTokens()
    async requestAuthTokens(
        authUrl: string,
        redirectUrlOrigin: string
    ): Promise<URLSearchParams> {
        const paramsString = await this.client.framePostClient.request(
            UiAppRequestType.REQUEST_AUTH_TOKENS,
            { authUrl, redirectUrlOrigin }
        );
        return new URLSearchParams(paramsString);
    }

    // Pass the URL query params. Must be called in a popup window opened by requestAuthTokens()
    // The counterpart to requestAuthTokens()
    resolveAuthTokens(paramsString: string) {
        this.client.framePostClient.onRequest(
            UiAppRequestType.REQUEST_AUTH_TOKENS,
            () => paramsString
        );
    }
}
