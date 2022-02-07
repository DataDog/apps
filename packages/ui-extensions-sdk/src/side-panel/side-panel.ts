import { FeatureType, RequestType } from '../constants';
import { DDFeatureClient } from '../shared/feature-client';
import {
    ContextClient,
    LoggerClient,
    RequestClient,
    SidePanelDefinition
} from '../types';
import { validateKey } from '../utils/utils';

export class DDSidePanelClient extends DDFeatureClient {
    constructor(client: ContextClient & LoggerClient & RequestClient) {
        super(client, FeatureType.SIDE_PANELS);
    }

    /**
     * Opens a side panel, given a full side panel definition or the key of a side panel
     * definition pre-defined in the app manifest
     */
    async open(definition: SidePanelDefinition, args?: unknown) {

        if (validateKey(definition)) {
            return this.sendRequest(RequestType.OPEN_SIDE_PANEL, {
                definition,
                args
            });
        }
    }

    /**
     * Closes any active side panels opened by this app. If a key is provided, it will only close the side panel
     * if it matches the provided key.
     */
    async close(key?: string) {

        return this.sendRequest(RequestType.CLOSE_SIDE_PANEL, key);
    }
}
