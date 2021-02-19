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

    private async isEnabled() {
        const {
            app: { features }
        } = await this.client.getContext();

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
