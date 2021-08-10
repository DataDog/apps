import type { DDClient } from '../client/client';
import { UiAppFeatureType, UiAppRequestType } from '../constants';
import { DDFeatureClient } from '../shared/feature-client';
import { SidePanelDefinition } from '../types';
import { validateKey } from '../utils/utils';

export class DDSidePanelClient extends DDFeatureClient {
    constructor(client: DDClient) {
        super(client, UiAppFeatureType.SIDE_PANELS);
    }

    /**
     * Opens a side panel, given a full side panel definition or the key of a side panel
     * definition pre-defined in the app manifest
     */
    async open(definition: SidePanelDefinition, args?: any) {
        console.log('xxx open', definition, args);
        await this.validateFeatureIsEnabled();

        if (validateKey(definition)) {
            return this.client.framePostClient.request(
                UiAppRequestType.OPEN_SIDE_PANEL,
                { definition, args }
            );
        }
    }

    /**
     * Closes any active side panels opened by this app. If a key is provided, it will only close the side panel
     * if it matches the provided key.
     */
    async close(key?: string) {
        await this.validateFeatureIsEnabled();

        return this.client.framePostClient.request(
            UiAppRequestType.CLOSE_SIDE_PANEL,
            key
        );
    }
}
