import { ChildClient } from '@datadog/framepost';

import { DDAPIClient } from '../api/api';
import { DDAuthClient } from '../auth/auth';
import { FramePostClientSettings, EventType, Host } from '../constants';
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
    IFrameDimensions,
    ParentAuthStateOptions
} from '../types';
import { Logger } from '../utils/logger';
import { DDWidgetContextMenuClient } from '../widget-context-menu/widget-context-menu';

declare const SDK_VERSION: string;

const DEFAULT_OPTIONS = {
    host: Host.STAGE,
    debug: false
};

export class DDClient<AuthStateArgs = unknown> {
    private readonly host: string;
    private context?: Context | null;
    readonly framePostClient: ChildClient<Context>;
    readonly logger: Logger;
    api: DDAPIClient;
    dashboard: DDDashboardClient;
    debug: boolean;
    events: DDEventsClient<AuthStateArgs>;
    location: DDLocationClient;
    modal: DDModalClient;
    sidePanel: DDSidePanelClient;
    secrets: DDSecretsClient;
    widgetContextMenu: DDWidgetContextMenuClient;
    auth: DDAuthClient<AuthStateArgs>;

    constructor(options: ClientOptions<AuthStateArgs> = {}) {
        this.host = options.host || DEFAULT_OPTIONS.host;
        this.debug = options.debug || DEFAULT_OPTIONS.debug;

        let authStateOptions: ParentAuthStateOptions | undefined;
        if (options.authProvider) {
            // pluck authStateCallback since it's not serializable and not needed in the client
            const { authStateCallback, ...rest } = options.authProvider;
            authStateOptions = rest;
        }

        this.framePostClient = new ChildClient<Context>({
            debug: FramePostClientSettings.DEBUG,
            handshakeTimeout: FramePostClientSettings.DEBUG
                ? FramePostClientSettings.HANDSHAKE_TIMEOUT_DEV_MODE
                : FramePostClientSettings.HANDSHAKE_TIMEOUT,
            requestTimeout: FramePostClientSettings.REQUEST_TIMEOUT,
            profile: this.debug,
            context: {
                sdkVersion: SDK_VERSION,
                authStateOptions: {
                    resolution: 'poll',
                    ...authStateOptions
                }
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

        this.events.on(EventType.CONTEXT_CHANGE, newContext => {
            this.context = newContext;

            this.syncDebugMode(this.context);
        });

        this.getContext().then(context => {
            this.syncDebugMode(context);
        });

        this.registerEventListeners();
    }

    private registerEventListeners() {
        // Since computing the size of an iframe is hard to do correctly,
        // we listen to `'resize'` events so we can send the actual values over.
        window.addEventListener('resize', () => {
            this.resize();
        });
    }

    /**
     * Notify the parent that the iframe should be resized.
     *
     * Will default any dimensions not given to the iframe's actual dimensions.
     *
     * There's no guarantee that the parent will adjust the iframe's dimensions.
     * The parent will also sanitize the dimensions attempting to keep the iframe within the viewport.
     */
    resize(dimensions?: Partial<IFrameDimensions>) {
        const style = window.getComputedStyle(document.documentElement);
        const parsedHeight = parseFloat(style.getPropertyValue('height'));
        const parsedWidth = parseFloat(style.getPropertyValue('width'));
        const height = Number.isNaN(parsedHeight)
            ? document.documentElement.scrollHeight
            : parsedHeight;
        const width = Number.isNaN(parsedWidth)
            ? document.documentElement.scrollWidth
            : parsedWidth;
        const computedDimensions: IFrameDimensions = {
            height: dimensions?.height ?? height,
            width: dimensions?.width ?? width
        };

        this.framePostClient.send(EventType.RESIZE_IFRAME, computedDimensions);
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
