import { ChildClient } from '@datadog/framepost';

import { DDAPIClient } from '../api/api';
import { DDAuthClient } from '../auth/auth';
import { UiAppEventType, Host } from '../constants';
import { DDDashboardClient } from '../dashboard/dashboard';
import { DDEventsClient } from '../events/events';
import { DDLocationClient } from '../location/location';
import { DDModalClient } from '../modal/modal';
import { DDSecretsClient } from '../secrets/secrets';
import { DDSidePanelClient } from '../side-panel/side-panel';
import type {
    Context,
    ClientContext,
    ClientOptions,
    ParentAuthStateOptions
} from '../types';
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
    dashboard: DDDashboardClient;
    debug: boolean;
    events: DDEventsClient;
    location: DDLocationClient;
    modal: DDModalClient;
    sidePanel: DDSidePanelClient;
    secrets: DDSecretsClient;
    widgetContextMenu: DDWidgetContextMenuClient;
    auth: DDAuthClient;

    constructor(options: ClientOptions = {}) {
        this.host = options.host || DEFAULT_OPTIONS.host;
        this.debug = options.debug || DEFAULT_OPTIONS.debug;

        let authStateOptions: ParentAuthStateOptions | undefined;
        if (options.authProvider) {
            // pluck authStateCallback since it's not serializable and not needed in the client
            const { authStateCallback, ...rest } = options.authProvider;
            authStateOptions = rest;
        }

        this.framePostClient = new ChildClient<Context>({
            debug: false, // 3p devs most likely dont need to see framepost debug messages
            profile: this.debug,
            context: {
                sdkVersion: SDK_VERSION,
                authStateOptions
            } as ClientContext
        });

        this.logger = new Logger(this);

        this.api = new DDAPIClient(this);
        this.auth = new DDAuthClient(this, options.authProvider);
        this.events = new DDEventsClient(this);
        this.dashboard = new DDDashboardClient(this);
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
    async getContext(): Promise<Context> {
        if (!this.context) {
            this.context = await this.framePostClient.handshake();
        }

        return this.context;
    }

    // Turn on debugger if dev mode is on in parent
    private syncDebugMode(context: Context | null) {
        this.debug = context?.app?.debug || this.debug;
    }
}
