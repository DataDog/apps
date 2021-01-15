export enum Host {
    PROD = 'https://app.datadoghq.com/',
    STAGE = 'https://dd.datad0g.com/'
}

export enum UiAppFeatureType {
    DASHBOARD_COG_MENU = 'dashboard_cog_menu',
    DASHBOARD_CUSTOM_WIDGET = 'dashboard_custom_widget',
    MODALS = 'modals'
}

export enum UiAppEventType {
    CUSTOM_EVENT = 'custom_event',
    DASHBOARD_COG_MENU_CLICK = 'dashboard_cog_menu_click',
    DASHBOARD_TIMEFRAME_CHANGE = 'dashboard_timeframe_change',
    DASHBOARD_TEMPLATE_VAR_CHANGE = 'dashboard_template_var_change',
    DASHBOARD_CUSTOM_WIDGET_OPTIONS_CHANGE = 'dashboard_custom_widget_options_change',
    MODAL_CLOSE = 'modal_close',
    MODAL_ACTION = 'modal_action',
    MODAL_CANCEL = 'modal_cancel'
}

export enum IFrameApiRequestMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

// "Requests" are distinct from events in that the sdk client expects a response
// from the frameManager, or vice-versa. This is useful when the child frames
// ask the parent frames to perform an operation.
export enum UiAppRequestType {
    API_REQUEST = 'api_request',
    EVENT_BROADCAST = 'event_broadcast',
    NAVIGATE_TOP = 'navigate_top',
    OPEN_MODAL = 'open_modal',
    CLOSE_MODAL = 'close_modal'
}

// These event types are always allowed, regardless of what features have been enabled
export const enabledEvents = new Set<UiAppEventType>([
    UiAppEventType.CUSTOM_EVENT
]);
