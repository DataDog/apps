import type {
    UiAppFeatureType,
    UiAppEventToSubscribeType,
    IFrameApiRequestMethod,
    IFrameApiRequestErrorType
} from './constants';

export interface ClientOptions {
    debug?: boolean;
    host?: string;
}

export type EventHandler<T = any> = (data: T) => void;

export interface HandleEventParams<T = any> {
    eventType: UiAppEventToSubscribeType;
    data: T;
}

interface AppContext {
    // Name of current user
    name: string;
    // Current user's email
    handle: string;
    // user's org
    organization: {
        id: string;
        name: string;
    };
    // list of enabled features
    features: UiAppFeatureType[];
}

// Context is the data type that gets sent to the `init` method
export interface Context {
    appContext: AppContext;
    frameContext?: any;
}

export interface FrameContext {
    sdkVersion: string;
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

export interface IFrameApiRequestError {
    isError: true;
    type: IFrameApiRequestErrorType;
    message: string;
    data?: any;
}
