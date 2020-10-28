import type {
    UiAppCapabilityType,
    UiAppEventToSubscribeType
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

// App context is the data type that gets sent to the `init` method, and propagated to `app_context` event handlers
export interface AppContext {
    // Name of current user
    name: string;
    // Current user's email
    handle: string;
    // user's org
    organization: {
        id: string;
        name: string;
    };
    // list of enabled capabilities
    capabilities: UiAppCapabilityType[];
}
