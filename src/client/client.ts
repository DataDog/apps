import { ChildClient } from '@datadog/framepost';

import { DDAPIClient } from '../api/api';
import { Host } from '../constants';
import { DDDashboardCogMenuClient } from '../dashboard-cog-menu/dashboard-cog-menu';
import { DDEventsClient } from '../events/events';
import { DDLocationClient } from '../location/location';
import { DDModalClient } from '../modal/modal';
import { DDSecretsClient } from '../secrets/secrets';
import { DDSidePanelClient } from '../side-panel/side-panel';
import type { Context, ClientContext, ClientOptions } from '../types';
import { getLogger, Logger } from '../utils/logger';
import { DDWidgetContextMenuClient } from '../widget-context-menu/widget-context-menu';

declare const SDK_VERSION: string;

const DEFAULT_OPTIONS = {
    host: Host.STAGE,
    debug: false
};

export class DDClient {
    private readonly host: string;
    private readonly debug: boolean;
    private readonly framePostClient: ChildClient<Context>;
    private readonly logger: Logger;
    api: DDAPIClient;
    events: DDEventsClient;
    dashboardCogMenu: DDDashboardCogMenuClient;
    location: DDLocationClient;
    modal: DDModalClient;
    sidePanel: DDSidePanelClient;
    secrets: DDSecretsClient;
    widgetContextMenu: DDWidgetContextMenuClient;

    constructor(options: ClientOptions = {}) {
        this.host = options.host || DEFAULT_OPTIONS.host;
        this.debug = options.debug || DEFAULT_OPTIONS.debug;

        this.framePostClient = new ChildClient<Context>({
            debug: this.debug,
            profile: this.debug,
            context: {
                sdkVersion: SDK_VERSION
            } as ClientContext
        });

        this.logger = getLogger(options);

        this.api = new DDAPIClient(
            this.debug,
            this.logger,
            this.framePostClient
        );

        this.events = new DDEventsClient(
            this.debug,
            this.logger,
            this.framePostClient
        );

        this.dashboardCogMenu = new DDDashboardCogMenuClient(
            this.debug,
            this.logger,
            this.framePostClient
        );

        this.location = new DDLocationClient(
            this.debug,
            this.logger,
            this.framePostClient
        );

        this.modal = new DDModalClient(
            this.debug,
            this.logger,
            this.framePostClient
        );

        this.sidePanel = new DDSidePanelClient(
            this.debug,
            this.logger,
            this.framePostClient
        );

        this.secrets = new DDSecretsClient(
            this.debug,
            this.logger,
            this.framePostClient
        );

        this.widgetContextMenu = new DDWidgetContextMenuClient(
            this.debug,
            this.logger,
            this.framePostClient
        );
    }

    /**
     * Returns app context data, after it is sent from the parent
     */
    async getContext(): Promise<Context> {
        return this.framePostClient.getContext();
    }
}
