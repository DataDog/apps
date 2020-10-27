export declare enum MessageType {
    CHANNEL_INIT = "channel_init",
    EVENT = "event",
    REQUEST = "request",
    RESPONSE = "response"
}
export declare enum MessageAPIVersion {
    v1 = "framepost/v1"
}
export declare enum ProfileEventType {
    POST_MESSAGE = "post_message",
    RECEIVE_MESSAGE = "receive_message"
}
export declare enum TransactionDirection {
    UP = "up",
    DOWN = "down"
}
export declare const REQUEST_TIMEOUT = 10000;
export declare const REQUEST_KEY_GET_PROFILE = "framepost_get_profile";
