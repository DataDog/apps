import { ChildClient } from '@datadog/framepost';

import { DDAPIClient } from '../api/api';
import { DDAuthClient } from '../auth/auth';
import { UiAppEventType, Host } from '../constants';
import { DDDashboardCogMenuClient } from '../dashboard-cog-menu/dashboard-cog-menu';
import { DDEventsClient } from '../events/events';
import { DDLocationClient } from '../location/location';
import { DDModalClient } from '../modal/modal';
import { DDSecretsClient } from '../secrets/secrets';
import { DDSidePanelClient } from '../side-panel/side-panel';
import type { Context, ClientContext, ClientOptions } from '../types';
import { Logger } from '../utils/logger';
import { DDWidgetContextMenuClient } from '../widget-context-menu/widget-context-menu';

declare const SDK_VERSION: string;

const DEFAULT_OPTIONS = {
    host: Host.STAGE,
    debug: false
};

export class DDClient {
    private readonly host: string;
    private context?: Context | null;
    readonly framePostClient: ChildClient<Context>;
    readonly logger: Logger;
    api: DDAPIClient;
    debug: boolean;
    events: DDEventsClient;
    dashboardCogMenu: DDDashboardCogMenuClient;
    location: DDLocationClient;
    modal: DDModalClient;
    sidePanel: DDSidePanelClient;
    secrets: DDSecretsClient;
    widgetContextMenu: DDWidgetContextMenuClient;
    auth: DDAuthClient;

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

        this.logger = new Logger(this);

        this.api = new DDAPIClient(this);
        this.auth = new DDAuthClient(this);
        this.events = new DDEventsClient(this);
        this.dashboardCogMenu = new DDDashboardCogMenuClient(this);
        this.location = new DDLocationClient(this);
        this.modal = new DDModalClient(this);
        this.sidePanel = new DDSidePanelClient(this);
        this.secrets = new DDSecretsClient(this);
        this.widgetContextMenu = new DDWidgetContextMenuClient(this);

        this.events.on(UiAppEventType.CONTEXT_CHANGE, newContext => {
            this.context = newContext;

            this.syncDebugMode(this.context);
        });

        this.getContext().then(context => {
            this.syncDebugMode(context);
        });
    }

    /**
     * Returns app context data, after it is sent from the parent
     */
    async getContext(): Promise<Context | null> {
        if (this.context === undefined) {
            this.context = await this.framePostClient.getContext();
        }

        return this.context;
    }

    // Turn on debugger if dev mode is on in parent
    private syncDebugMode(context: Context | null) {
        this.debug = context?.app?.debug || this.debug;
    }
}
