import type { DDClient } from '../client/client';
import { UiAppFeatureType, UiAppRequestType } from '../constants';
import { DDFeatureClient } from '../shared/feature-client';
import type { ModalDefinition } from '../types';
import { validateKey } from '../utils/utils';

export class DDModalClient extends DDFeatureClient {
    constructor(client: DDClient) {
        super(client, UiAppFeatureType.MODALS);
    }

    /**
     * Opens a modal, given a full modal definition or the key of a modal
     * definition pre-defined in the app manifest
     */
    async open(definition: ModalDefinition) {
        await this.validateFeatureIsEnabled();

        if (validateKey(definition)) {
            return this.client.framePostClient.request(
                UiAppRequestType.OPEN_MODAL,
                {
                    definition
                }
            );
        }
    }

    /**
     * Closes any active modals opened by this app. If a key is provided, it will only close the modal
     * if it matches the provided key.
     */
    async close(key?: string) {
        await this.validateFeatureIsEnabled();

        return this.client.framePostClient.request(
            UiAppRequestType.CLOSE_MODAL,
            key
        );
    }
}
