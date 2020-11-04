export enum MessageType {
    CHANNEL_INIT = 'channel_init',
    EVENT = 'event',
    REQUEST = 'request',
    RESPONSE = 'response'
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

export const REQUEST_TIMEOUT = 20000;

export const REQUEST_KEY_GET_PROFILE = 'framepost_get_profile';
