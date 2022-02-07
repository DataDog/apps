import { FeatureType, RequestType } from '../constants';
import { DDFeatureClient } from '../shared/feature-client';
import type {
    ContextClient,
    LoggerClient,
    ModalDefinition,
    RequestClient
} from '../types';
import { validateKey } from '../utils/utils';

export class DDModalClient extends DDFeatureClient {
    constructor(client: ContextClient & LoggerClient & RequestClient) {
        super(client, FeatureType.MODALS);
    }

    /**
     * Opens a modal, given a full modal definition or the key of a modal
     * definition pre-defined in the app manifest
     */
    async open(definition: ModalDefinition, args?: unknown) {

        if (validateKey(definition)) {
            return this.sendRequest(RequestType.OPEN_MODAL, {
                definition,
                args
            });
        }
    }

    /**
     * Closes any active modals opened by this app. If a key is provided, it will only close the modal
     * if it matches the provided key.
     */
    async close(key?: string) {

        return this.sendRequest(RequestType.CLOSE_MODAL, key);
    }
}
