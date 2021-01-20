import type {
    UiAppFeatureType,
    UiAppEventType,
    IFrameApiRequestMethod
} from './constants';

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
    organization: {
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
    definition: {
        options?: {
            [key: string]: any;
        };
    };
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
