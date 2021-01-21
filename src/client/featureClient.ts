import type { ChildClient } from '@datadog/framepost';

import type { UiAppFeatureType } from '../constants';
import type { Context } from '../types';
import type { Logger } from '../utils/logger';
import { isFeatureEnabled } from '../utils/utils';

export class DDFeatureClient {
    protected readonly debug: boolean;
    protected readonly logger: Logger;
    protected readonly framePostClient: ChildClient<Context>;
    protected readonly featureType: UiAppFeatureType;

    constructor(
        debug: boolean,
        logger: Logger,
        framePostClient: ChildClient,
        featureType: UiAppFeatureType
    ) {
        this.debug = debug;
        this.logger = logger;
        this.framePostClient = framePostClient;
        this.featureType = featureType;
    }

    private async isEnabled() {
        const {
            app: { features }
        } = await this.framePostClient.getContext();

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
