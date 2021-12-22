export enum MessageType {
    CHANNEL_INIT = 'channel_init',
    EVENT = 'event',
    REQUEST = 'request',
    RESPONSE = 'response',
    ERROR_RESPONSE = 'error_response'
}

export enum MessageAPIVersion {
    v1 = 'framepost/v1'
}

export enum ProfileEventType {
    POST_MESSAGE = 'post_message',
    RECEIVE_MESSAGE = 'receive_message'
}

export enum TransactionDirection {
    UP = 'up',
    DOWN = 'down'
}

export enum SerializationType {
    NONE = 'none',
    ERROR = 'error'
}

export const DEFAULT_REQUEST_TIMEOUT = 20000;

export const REQUEST_KEY_GET_PROFILE = 'framepost_get_profile';
