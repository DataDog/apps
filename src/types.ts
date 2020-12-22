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

export interface CustomWidgetFrameContext {
    timeframe: {
        from_ts: number;
        to_ts: number;
        live: boolean;
    };
    templateVars: TemplateVariableValue[];
    options: {
        [key: string]: any;
    };
}

// Context is the data type that gets sent to the `init` method
export interface Context<T = any> {
    appContext: AppContext;
    frameContext: T;
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
