import type { FeatureType } from '../constants';
import { ContextClient, LoggerClient, RequestClient } from '../types';
import { isFeatureEnabled } from '../utils/utils';

export class DDFeatureClient {
    protected readonly client: ContextClient & LoggerClient & RequestClient;
    protected readonly featureType: FeatureType;

    constructor(
        client: ContextClient & LoggerClient & RequestClient,
        featureType: FeatureType
    ) {
        this.client = client;
        this.featureType = featureType;
    }

    private async isEnabled(): Promise<boolean> {
        const context = await this.client.getContext();

        const {
            app: { features }
        } = context;

        return isFeatureEnabled(this.featureType, features);
    }

    protected async validateFeatureIsEnabled() {
        const isEnabled = await this.isEnabled();

        if (!isEnabled) {
            throw new Error(
                `Please enable the "${this.featureType}" feature to access this functionality.`
            );
        }
    }
}
