import type { DDClient } from '../client/client';
import type { FeatureType } from '../constants';
import { isFeatureEnabled } from '../utils/utils';

export class DDFeatureClient {
    protected readonly client: DDClient;
    protected readonly featureType: FeatureType;

    constructor(client: DDClient, featureType: FeatureType) {
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
        // will throw a handshake error if handshake fails
        await this.client.framePostClient.handshake();

        const isEnabled = await this.isEnabled();

        if (!isEnabled) {
            throw new Error(
                `Please enable the "${this.featureType}" feature to access this functionality.`
            );
        }
    }
}
