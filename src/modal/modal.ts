import type { ChildClient } from '@datadog/framepost';

import { UiAppFeatureType, UiAppRequestType } from '../constants';
import type { Context } from '../types';
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

        if (isEnabled) {
            return this.framePostClient.request(
                UiAppRequestType.OPEN_MODAL,
                definitionOrKey
            );
        } else {
            this.logger.error(
                `Please enable the "${UiAppFeatureType.MODALS}" feature to access this functionality.`
            );
        }
    }

    /**
     * Closes any active modals opened by this app. If a key is provided, it will only close the modal
     * if it matches the provided key.
     */
    async close(key?: string) {
        const isEnabled = await this.isEnabled();

        if (isEnabled) {
            return this.framePostClient.request(
                UiAppRequestType.CLOSE_MODAL,
                key
            );
        } else {
            this.logger.error(
                `Please enable the "${UiAppFeatureType.MODALS}" feature to access this functionality.`
            );
        }
    }

    private async isEnabled() {
        const {
            app: { features }
        } = await this.framePostClient.getContext();

        return isFeatureEnabled(UiAppFeatureType.MODALS, features);
    }
}

export enum ModalSize {
    SMALL = 'sm',
    MEDIUM = 'md',
    LARGE = 'lg'
    // TODO: implement auto-sized modals
}

export enum ModalActionLevel {
    PRIMARY = 'primary',
    SUCCESS = 'success',
    WARNING = 'warning',
    DANGER = 'danger'
}

export interface ModalDefinition {
    key: string;
    title?: string;
    size?: ModalSize;
    isCloseable?: boolean;
    message?: string;
    source?: string;
    actionLabel?: string;
    actionLevel?: ModalActionLevel;
    cancelLabel?: string;
}
