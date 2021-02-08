import type { ChildClient } from '@datadog/framepost';

import { UiAppFeatureType, UiAppRequestType } from '../constants';
import { DDFeatureClient } from '../shared/feature-client';
import type { ModalDefinition } from '../types';
import type { Logger } from '../utils/logger';
import { validateKey } from '../utils/utils';

export class DDModalClient extends DDFeatureClient {
    constructor(debug: boolean, logger: Logger, framePostClient: ChildClient) {
        super(debug, logger, framePostClient, UiAppFeatureType.MODALS);
    }

    /**
     * Opens a modal, given a full modal definition or the key of a modal
     * definition pre-defined in the app manifest
     */
    async open(definitionOrKey: ModalDefinition | string) {
        await this.validateFeatureIsEnabled();

        if (validateKey(definitionOrKey)) {
            return this.framePostClient.request(
                UiAppRequestType.OPEN_MODAL,
                definitionOrKey
            );
        }
    }

    /**
     * Closes any active modals opened by this app. If a key is provided, it will only close the modal
     * if it matches the provided key.
     */
    async close(key?: string) {
        await this.validateFeatureIsEnabled();

        return this.framePostClient.request(UiAppRequestType.CLOSE_MODAL, key);
    }
}
