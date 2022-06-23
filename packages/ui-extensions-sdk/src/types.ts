import type {
    ColorTheme,
    EventType,
    FeatureType,
    MenuItemType,
    ModalActionLevel,
    ModalSize,
    RequestType,
    WidgetOptionItemType
} from './constants';

export interface ContextClient {
    getContext(): Promise<Context>;
}

export interface DebugClient {
    debug: boolean;
}

export interface EventClient {
    on<T = unknown>(
        eventType: EventType,
        eventHandler: EventHandler<T>
    ): () => void;
    send<T = unknown>(eventType: EventType, eventData: T): Promise<void>;
}

export interface LoggerClient {
    log(message: string): void;
    logWarning(message: string): void;
    logError(message: string): void;
}

export interface RequestClient {
    onRequest<Q = unknown, R = unknown>(
        requestType: RequestType,
        requestHandler: RequestHandler<Q, R>
    ): () => void;
    request<Q = unknown, R = unknown>(
        requestType: RequestType,
        requestData?: Q
    ): Promise<R>;
}

export type RequestHandler<Q = unknown, R = unknown> = (requestData: Q) => R;

export interface ClientOptions<AuthStateArgs = unknown> {
    debug?: boolean;
    host?: string;
    authProvider?: AuthStateOptions<AuthStateArgs>;
}

export type EventHandler<T = unknown> = (data: T) => void;

export interface HandleEventParams<T = unknown> {
    eventType: EventType;
    data: T;
}

export interface AppContext {
    currentUser: {
        // Current user's time zone. The time zone can differ from the browser's time zone
        // if user has changed it in the Datadog settings.
        timeZone: string;
        // Current user's Color Theme (dark, light)
        colorTheme: ColorTheme;
    };
    // list of enabled features
    features: FeatureType[];
    // is app running in debug mode
    debug: boolean;
}

// TODO: Could colocate these feature-specific types with feature defs
export interface TemplateVariableValue {
    name: string;
    value: string;
    prefix?: string;
    default?: string;
}

export interface Timeframe {
    start: number;
    end: number;
    isLive: boolean;
}

export interface DashboardContext {
    // dashboard id
    id: string;
    // public dashboard share URL
    shareURL: string;
    timeframe: Timeframe;
    templateVars: TemplateVariableValue[];
}

// TODO: This is an incomplete typing because widget API typing is exenstive and varied based on widget type.
// We should port full typing here eventually
export interface DashboardWidgetContext {
    id?: number;
    definition: CustomWidgetDefinition | any;
    layout?: any;
}

export interface WidgetInteractionContext {
    groupTags: string[];
}

export interface MenuItemContext {
    key: string;
}

// A combined object specifing data about the context of a feature within the app
export interface FeatureContext {
    dashboard?: DashboardContext;
    widget?: DashboardWidgetContext;
    menuItem?: MenuItemContext;
    widgetInteraction?: WidgetInteractionContext;
    // Optional arguements passed to different feature components like modal, side panel, etc
    args?: unknown;
}

// A full context object including above feature context and additional global app context
export interface Context extends FeatureContext {
    app: AppContext;
}

export interface ClientContext {
    sdkVersion: string;
    authStateOptions?: ParentAuthStateOptions;
}

export interface Feature {
    /* Feature type */
    type: FeatureType;
    /* The events associated with this feature */
    events: EventType[];
}

export type ApiRequestMethod = 'GET' | 'PUT' | 'POST' | 'PATCH' | 'DELETE';
export type ApiRequestContentType = 'json' | 'urlencoded' | 'formdata';

export interface ApiRequestOptions<Q> {
    method?: ApiRequestMethod;
    params?: Record<string, string>;
    contentType?: ApiRequestContentType;
    data?: Q;
}

export interface ApiRequest<Q> extends ApiRequestOptions<Q> {
    resource: string;
}

export interface DefinitionWithKey {
    key: string;
}

export interface MenuItemCommon extends DefinitionWithKey, OrderedItem {
    label: string;
}

export interface LinkMenuItem extends MenuItemCommon {
    actionType: MenuItemType.LINK;
    href: string;
}

export interface EventMenuItem extends MenuItemCommon {
    actionType: MenuItemType.EVENT;
}

export type MenuItem = LinkMenuItem | EventMenuItem;

export interface MenuItemRequestResponse {
    items: MenuItem[];
}

// Modals
export interface ModalDefinition extends DefinitionWithKey {
    title?: string;
    size?: ModalSize;
    message?: string;
    source?: string;
    actionLabel?: string;
    actionLevel?: ModalActionLevel;
    cancelLabel?: string;
}

// Sidepanels
export interface SidePanelDefinition extends DefinitionWithKey {
    title?: string;
    source?: string;
}

// Widget Context Menus
export type WidgetContextMenuClickData = RequireKeys<
    FeatureContext,
    'widget' | 'widgetInteraction' | 'menuItem'
>;

export type GetWidgetContextMenuItemsRequest = RequireKeys<
    FeatureContext,
    'widget' | 'widgetInteraction'
>;

export interface GetWidgetContextMenuItemsResponse
    extends MenuItemRequestResponse {}

// Cog Menus
export type DashboardCogMenuClickData = RequireKeys<
    FeatureContext,
    'dashboard' | 'menuItem'
>;

export type GetDashboardCogMenuItemsRequest = RequireKeys<
    FeatureContext,
    'dashboard'
>;

export interface GetDashboardCogMenuItemsResponse
    extends MenuItemRequestResponse {}

export interface AuthState<Args = unknown> {
    args?: Args;
    isAuthenticated: boolean;
}

// poll resolution is the default
export interface AuthStateOptionsPollResolution {
    retryInterval?: number;
}

export interface AuthStateOptionsMessageResolution {
    resolution: 'message';
}

export interface AuthStateOptionsCloseResolution {
    resolution: 'close';
}

export type ParentAuthStateOptions = {
    url: string;
    totalTimeout?: number;
    requestTimeout?: number;
} & (
    | AuthStateOptionsPollResolution
    | AuthStateOptionsMessageResolution
    | AuthStateOptionsCloseResolution
);

export type AuthStateOptions<
    AuthStateArgs = unknown
> = ParentAuthStateOptions & {
    authStateCallback: () =>
        | Promise<AuthState<AuthStateArgs> | boolean>
        | AuthState<AuthStateArgs>
        | boolean;
};

interface WidgetOptionEnum {
    label: string;
    value: string;
}

export interface WidgetOptionItemBase extends OrderedItem {
    label: string;
    name: string;
    required?: boolean;
    loading?: boolean;
}

export interface WidgetOptionItemBoolean extends WidgetOptionItemBase {
    type: WidgetOptionItemType.BOOLEAN;
    default?: boolean;
}

export interface WidgetOptionItemString extends WidgetOptionItemBase {
    type: WidgetOptionItemType.STRING;
    default?: string;
    enum?: (string | WidgetOptionEnum)[];
}

export type WidgetOptionItem = WidgetOptionItemBoolean | WidgetOptionItemString;

export interface WidgetSettingsMenuClickData
    extends RequireKeys<FeatureContext, 'widget' | 'menuItem'> {
    widget: Omit<DashboardWidgetContext, 'definition'> & {
        definition: CustomWidgetDefinition;
    };
}

export interface CustomWidgetDefinition {
    options?: {
        [key: string]: string | boolean;
    };
    custom_widget_key: string;
}

export interface CustomWidgetItem {
    name: string;
    source: string;
    options: WidgetOptionItem[];
    customWidgetKey: string;
    icon?: string;
}

// Payload of event broadcast when oauth access is updated
export interface APIAccessChangeEvent {
    isAuthorized: boolean;
}

export interface OrderedItem {
    order?: number;
}

export interface IFrameDimensions {
    height: number;
    width: number;
}

/**
 * Typescript utility type, takes an interface and makes the specified keys required
 * Example: RequireKeys<MyType, 'a' | 'b'>
 */
type RequireKeys<T, K extends keyof T> = {
    [X in Exclude<keyof T, K>]?: T[X];
} &
    {
        [P in K]-?: T[P];
    };

export type NotificationLevel = 'success' | 'warning' | 'danger';

export interface NotificationDefinition {
    label: string;
    level?: NotificationLevel;
}

export interface DeprecatedEventUsage {
    entity: 'event';
    eventType: EventType;
}

export type DeprecatedUsage = DeprecatedEventUsage; // we can union type here later

export interface LoadedResourceMetadata {
    startTimeTs: number; // timestamp (in ms) of the resource started being fetched
    secureConnectionStartTs: number; // timestamp (in ms) of the SSL handshake
    url?: string; // the resources URL (set to null in case of network calls for privacy reason). This value doesn't change even if the request is redirected.
    urlHostname: string; // the resource URL hostname
    initiatorType: string; // the type of resource that initiated the performance event (xmlhttprequest, css, img)
    nextHopProtocol: string; // the network protocol used to fetch the resource, as identified by the ALPN Protocol ID (RFC7301).
    duration: number; // overall time required to fetch the resource
    decodedBodySize: number; // size of the body after removing any applied content-codings
}

export interface LoadedResourceMetaDataBatch {
    resources: LoadedResourceMetadata[];
}

export interface OrgConfig {
    [key: string]: string | boolean;
}
