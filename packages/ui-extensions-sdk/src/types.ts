import type {
    FeatureType,
    EventType,
    ModalSize,
    ModalActionLevel,
    MenuItemType,
    WidgetOptionItemType,
    ColorTheme,
    FeatureRenderType
} from './constants';
import type { RequireKeys } from './utils/utils';

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
    // OOOB Table row click context
    table?: TableContext;
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
interface ModalDefinitionBase extends DefinitionWithKey {
    title?: string;
    size?: ModalSize;
    message?: string;
    actionLabel?: string;
    actionLevel?: ModalActionLevel;
    cancelLabel?: string;
}

export interface ModalDefinition
    extends ModalDefinitionBase,
        RenderedFeatureDefinition {}

/**
 * Deprecated - do not use.
 * @deprecated use ModalDefinition instead
 */
export interface ModalDefinitionWithOldDefinition
    extends ModalDefinitionBase,
        FramedFeatureWithOldDefinition {}

// Sidepanels
interface SidePanelDefinitionBase extends DefinitionWithKey {
    title?: string;
}
export interface SidePanelDefinition
    extends SidePanelDefinitionBase,
        RenderedFeatureDefinition {}

/**
 * Deprecated - do not use.
 * @deprecated use SidePanelDefinition instead
 */
export interface SidePanelDefinitionWithOldDefinition
    extends SidePanelDefinitionBase,
        FramedFeatureWithOldDefinition {}

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

// OOB Components
interface OOBButton extends DefinitionWithKey {
    // TODO: commong with MenuItemType. Unify.
    actionType: 'link' | 'event';
    // TODO: extract into a separate type to be used in other types
    level: 'default' | 'success' | 'warning' | 'danger';
    label?: string;
}
export interface FrameRenderOptions {
    type: FeatureRenderType.FRAME;
    source: string;
}

export interface TableRenderOptions {
    type: FeatureRenderType.TABLE;
    tableKey: string;
}

export type RenderOptions = FrameRenderOptions | TableRenderOptions;

export interface RenderedFeatureDefinition {
    renderOptions: RenderOptions;
}

export interface FramedFeatureWithOldDefinition {
    // for backward compatiblity with old features before introducing OOB Components
    /**
     * Deprecated - do not use.
     * @deprecated use renderOptions.source instead
     */
    source?: string;
}
// Table component
export interface TableContext {
    tableKey: string;
    searchQuery: string;
    args?: {
        [key: string]: any;
    };
}
export interface GetTableDefResponse {
    data: any[];
    columns: any[];
    rowAction?: boolean;
    emptyStateMessage?: string;
    searchInputPlaceholder?: string;
    hasHeaders?: boolean;
    searchType?: 'none' | 'filter' | 'external_search';
    footerButtons?: [OOBButton] | [OOBButton, OOBButton];
}

export type TableRowClickData = RequireKeys<FeatureContext, 'table'> & {
    rowInfo?: any;
};

export type GetTableDefRequest = RequireKeys<FeatureContext, 'table'>;

export type TableRequestHandler = (
    context: GetTableDefRequest
) => GetTableDefResponse | Promise<GetTableDefResponse>;
