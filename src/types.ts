import type {
    UiAppFeatureType,
    UiAppEventType,
    IFrameApiRequestMethod,
    ModalSize,
    ModalActionLevel,
    MenuItemType
} from './constants';
import type { RequireKeys } from './utils/utils';

export interface ClientOptions {
    debug?: boolean;
    host?: string;
}

export type EventHandler<T = any> = (data: T) => void;

export interface HandleEventParams<T = any> {
    eventType: UiAppEventType;
    data: T;
}

export interface AppContext {
    currentUser: {
        // ID of current user
        id: number;
        // Name of current user
        name: string;
        // Current user's email
        handle: string;
    };

    // user's org
    org: {
        id: number;
        name: string;
    };
    // list of enabled features
    features: UiAppFeatureType[];
}

// TODO: Could colocate these feature-specific types with feature defs
export interface TemplateVariableValue {
    name: string;
    value: string;
    prefix?: string;
    default?: string;
}

export interface Timeframe {
    from_ts: number;
    to_ts: number;
    live: boolean;
}

export interface DashboardContext {
    // dashboard id
    id: string;
    // public dashboard share token
    shareToken: string;
    timeframe: Timeframe;
    templateVars: TemplateVariableValue[];
}

// TODO: This is an incomplete typing because widget API typing is exenstive and varied based on widget type.
// We should port full typing here eventually
export interface DashboardWidgetContext {
    id?: number;
    definition:
        | {
              options?: {
                  [key: string]: any;
              };
          }
        | any;
    layout?: any;
}

export interface MenuItemContext {
    key: string;
}

// A combined object specifing data about the context of a feature within the app
export interface FeatureContext {
    dashboard?: DashboardContext;
    widget?: DashboardWidgetContext;
    menuItem?: MenuItemContext;
    // Optional arguements passed to different feature components like modal, side panel, etc
    args?: any;
}

// A full context object including above feature context and additional global app context
export interface Context extends FeatureContext {
    app: AppContext;
}

export interface FrameContext {
    sdkVersion: string;
}

export interface UiAppFeature {
    /* Feature type */
    type: UiAppFeatureType;
    /* The events associated with this feature */
    events: UiAppEventType[];
}

export interface IframeApiRequestOptions {
    params?: {
        [key: string]: any;
    };
}

export interface IFrameApiRequest<Q> {
    method: IFrameApiRequestMethod;
    resource: string;
    options: IframeApiRequestOptions;
    body: Q;
}

export interface DefinitionWithKey {
    key: string;
}

export interface MenuItemCommon extends DefinitionWithKey {
    label: string;
}

export interface LinkMenuItem extends MenuItemCommon {
    type: MenuItemType.LINK;
    href: string;
}

export interface EventMenuItem extends MenuItemCommon {
    type: MenuItemType.EVENT;
}

export type MenuItem = LinkMenuItem | EventMenuItem;

export interface MenuItemRequestResponse {
    items: MenuItem[];
}

// Modals
export interface ModalDefinition extends DefinitionWithKey {
    title?: string;
    size?: ModalSize;
    isCloseable?: boolean;
    message?: string;
    source?: string;
    actionLabel?: string;
    actionLevel?: ModalActionLevel;
    cancelLabel?: string;
}

// Sidepanels
export interface SidePanelDefinition extends DefinitionWithKey {
    width?: string;
    source?: string;
    hideCloseButton?: boolean;
    willCloseOnEsc?: boolean;
}

// Widget Context Menus
export type WidgetContextMenuClickData = RequireKeys<
    FeatureContext,
    'widget' | 'menuItem'
>;

export type GetWidgetContextMenuItemsRequest = RequireKeys<
    FeatureContext,
    'widget'
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
