import type { DDClient } from '../client/client';
import type { UiAppFeatureType } from '../constants';
import { isFeatureEnabled } from '../utils/utils';

export class DDFeatureClient {
    protected readonly client: DDClient;
    protected readonly featureType: UiAppFeatureType;

    constructor(client: DDClient, featureType: UiAppFeatureType) {
        this.client = client;
        this.featureType = featureType;
    }

    private async isEnabled(): Promise<boolean> {
        const context = await this.client.getContext();

        if (!context) {
            return false;
        }

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
