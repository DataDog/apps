import type { FeatureType, RequestType } from '../constants';
import {
    Context,
    ContextClient,
    LoggerClient,
    RequestClient,
    RequestHandler
} from '../types';
import { isFeatureEnabled } from '../utils/utils';

export class DDFeatureClient {
    private readonly client: ContextClient & LoggerClient & RequestClient;
    protected readonly featureType: FeatureType;

    constructor(
        client: ContextClient & LoggerClient & RequestClient,
        featureType: FeatureType
    ) {
        this.client = client;
        this.featureType = featureType;
    }

    protected getContext(): Promise<Context> {
        return this.client.getContext();
    }

    protected handleRequest<Q = unknown, R = unknown>(
        requestType: RequestType,
        requestHandler: RequestHandler<Q, R | Promise<R>>
    ): () => void {
        const wrappedHandler = async (requestData: Q): Promise<R> => {
            await this.validateFeatureIsEnabled();
            return requestHandler(requestData);
        };

        return this.client.onRequest(requestType, wrappedHandler);
    }

    protected logError(message: string): void {
        return this.client.logError(message);
    }

    protected async sendRequest<Q = unknown, R = unknown>(
        requestType: RequestType,
        requestData?: Q
    ): Promise<R> {
        await this.validateFeatureIsEnabled();
        return this.client.request(requestType, requestData);
    }

    private async isEnabled(): Promise<boolean> {
        const context = await this.client.getContext();

        const {
            app: { features }
        } = context;

        return isFeatureEnabled(this.featureType, features);
    }

    private async validateFeatureIsEnabled() {
        const isEnabled = await this.isEnabled();

        if (!isEnabled) {
            throw new Error(
                `Please enable the "${this.featureType}" feature to access this functionality.`
            );
        }
    }
}
