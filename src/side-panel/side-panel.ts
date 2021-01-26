import type { ChildClient } from '@datadog/framepost';

import { DDFeatureClient } from '../client/featureClient';
import { UiAppFeatureType, UiAppRequestType } from '../constants';
import { SidePanelDefinition } from '../types';
import type { Logger } from '../utils/logger';
import { validateKey } from '../utils/utils';

export class DDSidePanelClient extends DDFeatureClient {
    constructor(debug: boolean, logger: Logger, framePostClient: ChildClient) {
        super(debug, logger, framePostClient, UiAppFeatureType.SIDE_PANELS);
    }

    /**
     * Opens a side panel, given a full side panel definition or the key of a side panel
     * definition pre-defined in the app manifest
     */
    async open(definitionOrKey: SidePanelDefinition | string, context?: any) {
        await this.validateFeatureIsEnabled();

        if (validateKey(definitionOrKey)) {
            return this.framePostClient.request(
                UiAppRequestType.OPEN_SIDE_PANEL,
                { definitionOrKey, context }
            );
        }
    }

    /**
     * Closes any active side panels opened by this app. If a key is provided, it will only close the side panel
     * if it matches the provided key.
     */
    async close(key?: string) {
        await this.validateFeatureIsEnabled();

        return this.framePostClient.request(
            UiAppRequestType.CLOSE_SIDE_PANEL,
            key
        );
    }
}
