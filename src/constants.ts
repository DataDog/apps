export enum Host {
    PROD = 'https://app.datadoghq.com/',
    STAGE = 'https://dd.datad0g.com/'
}

export enum UiAppFeatureType {
    DASHBOARD_COG_MENU = 'dashboard_cog_menu',
    DASHBOARD_CONTEXT_MENU = 'dashboard_context_menu',
    DASHBOARD_CUSTOM_WIDGET = 'dashboard_custom_widget',
    MODALS = 'modals',
    SIDE_PANELS = 'side_panels'
}

export enum UiAppEventType {
    // General
    CUSTOM_EVENT = 'custom_event',

    // Dashboards
    DASHBOARD_COG_MENU_CLICK = 'dashboard_cog_menu_click',
    DASHBOARD_CONTEXT_MENU_CLICK = 'dashboard_context_menu_click',
    DASHBOARD_TIMEFRAME_CHANGE = 'dashboard_timeframe_change',
    DASHBOARD_TEMPLATE_VAR_CHANGE = 'dashboard_template_var_change',
    DASHBOARD_CUSTOM_WIDGET_OPTIONS_CHANGE = 'dashboard_custom_widget_options_change',

    // Modals
    MODAL_CLOSE = 'modal_close',
    MODAL_ACTION = 'modal_action',
    MODAL_CANCEL = 'modal_cancel',

    // Side panels
    SIDE_PANEL_CLOSE = 'side_panel_close'
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
    // API
    API_REQUEST = 'api_request',

    // Events
    EVENT_BROADCAST = 'event_broadcast',

    // Location
    NAVIGATE_TOP = 'navigate_top',

    // Modals
    OPEN_MODAL = 'open_modal',
    CLOSE_MODAL = 'close_modal',

    // Side panels
    OPEN_SIDE_PANEL = 'open_side_panel',
    CLOSE_SIDE_PANEL = 'close_side_panel',

    // Secrets
    SET_SECRET = 'set_secret',
    GET_SECRET = 'get_secret',
    REMOVE_SECRET = 'remove_secret',
    GET_ALL_SECRETS = 'get_all_secrets'
}

// These event types are always allowed, regardless of what features have been enabled
export const enabledEvents = new Set<UiAppEventType>([
    UiAppEventType.CUSTOM_EVENT
]);

export enum ModalSize {
    SMALL = 'sm',
    MEDIUM = 'md',
    LARGE = 'lg'
    // TODO: implement auto-sized modals
}

export enum ModalActionLevel {
    PRIMARY = 'primary',
    SUCCESS = 'success',
    WARNING = 'warning',
    DANGER = 'danger'
}
