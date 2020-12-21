import type { ChildClient } from '@datadog/framepost';

import { UiAppRequestType } from '../constants';
import type { Context } from '../types';
import type { Logger } from '../utils/logger';

export class DDLocationClient {
    private readonly debug: boolean;
    private readonly logger: Logger;
    private readonly framePostClient: ChildClient<Context>;

    constructor(debug: boolean, logger: Logger, framePostClient: ChildClient) {
        this.debug = debug;
        this.logger = logger;
        this.framePostClient = framePostClient;
    }

    async goTo(url: string) {
        return this.framePostClient.request<NavigateTopRequest>(
            UiAppRequestType.NAVIGATE_TOP,
            {
                url
            }
        );
    }
}

export interface NavigateTopRequest {
    url: string;
}
