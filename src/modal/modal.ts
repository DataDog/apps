import type { ChildClient } from '@datadog/framepost';

import { UiAppFeatureType, UiAppRequestType } from '../constants';
import type { Context, ModalDefinition } from '../types';
import type { Logger } from '../utils/logger';
import { isFeatureEnabled } from '../utils/utils';

export class DDModalClient {
    private readonly debug: boolean;
    private readonly logger: Logger;
    private readonly framePostClient: ChildClient<Context>;

    constructor(debug: boolean, logger: Logger, framePostClient: ChildClient) {
        this.debug = debug;
        this.logger = logger;
        this.framePostClient = framePostClient;
    }

    /**
     * Opens a modal, given a full modal definition or the key of a modal
     * definition pre-defined in the app manifest
     */
    async open(definitionOrKey: ModalDefinition | string) {
        const isEnabled = await this.isEnabled();

        if (!isEnabled) {
            throw new Error(
                `Please enable the "${UiAppFeatureType.MODALS}" feature to access this functionality.`
            );
        }

        this.validateModalDefinition(definitionOrKey);

        return this.framePostClient.request(
            UiAppRequestType.OPEN_MODAL,
            definitionOrKey
        );
    }

    /**
     * Closes any active modals opened by this app. If a key is provided, it will only close the modal
     * if it matches the provided key.
     */
    async close(key?: string) {
        const isEnabled = await this.isEnabled();

        if (!isEnabled) {
            throw new Error(
                `Please enable the "${UiAppFeatureType.MODALS}" feature to access this functionality.`
            );
        }

        return this.framePostClient.request(UiAppRequestType.CLOSE_MODAL, key);
    }

    private async isEnabled() {
        const {
            app: { features }
        } = await this.framePostClient.getContext();

        return isFeatureEnabled(UiAppFeatureType.MODALS, features);
    }

    private validateModalDefinition(
        definitionOrKey: ModalDefinition | string
    ): boolean {
        if (typeof definitionOrKey === 'string') {
            return definitionOrKey.length > 0;
        }

        const definition = definitionOrKey as ModalDefinition;

        if (!definition.key) {
            throw new Error('Modal definition missing required field ".key"');
        }

        return true;
    }
}
