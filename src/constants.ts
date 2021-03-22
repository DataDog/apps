export enum Host {
    PROD = 'https://app.datadoghq.com/',
    STAGE = 'https://dd.datad0g.com/'
}

export enum UiAppFeatureType {
    DASHBOARD_COG_MENU = 'dashboard_cog_menu',
    DASHBOARD_CUSTOM_WIDGET = 'dashboard_custom_widget',
    MODALS = 'modals',
    SIDE_PANELS = 'side_panels',
    WIDGET_CONTEXT_MENU = 'widget_context_menu'
}

export enum UiAppEventType {
    // General
    CUSTOM_EVENT = 'custom_event',
    CONTEXT_CHANGE = 'context_change',

    // Dashboards
    DASHBOARD_COG_MENU_CLICK = 'dashboard_cog_menu_click',
    DASHBOARD_TIMEFRAME_CHANGE = 'dashboard_timeframe_change',
    DASHBOARD_CURSOR_CHANGE = 'dashboard_cursor_change',
    DASHBOARD_TEMPLATE_VAR_CHANGE = 'dashboard_template_var_change',
    DASHBOARD_CUSTOM_WIDGET_OPTIONS_CHANGE = 'dashboard_custom_widget_options_change',

    // Modals
    MODAL_CLOSE = 'modal_close',
    MODAL_ACTION = 'modal_action',
    MODAL_CANCEL = 'modal_cancel',

    // Side panels
    SIDE_PANEL_CLOSE = 'side_panel_close',

    // Widgets
    WIDGET_CONTEXT_MENU_CLICK = 'widget_context_menu_click'
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
    STORE_SECRET = 'store_secret',
    REMOVE_SECRET = 'remove_secret',
    LOAD_ALL_SECRETS = 'load_all_secrets',
    REMOVE_ALL_SECRETS = 'remove_all_secrets',
    LOAD_SECRET = 'load_secret',
    GET_SECRET = 'get_secret',
    SET_SECRET = 'set_secret',
    REMOVE_SECRET_PUBLIC = 'remove_secret_public',
    REQUEST_AUTH_TOKENS = 'request_auth_tokens',

    // Context Menu
    GET_WIDGET_CONTEXT_MENU_ITEMS = 'get_widget_context_menu_items',

    // Dashboard Cog Menu
    GET_DASHBOARD_COG_MENU_ITEMS = 'get_dashboard_cog_menu_items',

    // Notify parent
    SET_DASHBOARD_TEMPLATE_VARS = 'set_dashboard_template_vars',
    SET_DASHBOARD_TIMEFRAME = 'set_dashboard_timeframe',
    SET_DASHBOARD_CURSOR = 'set_dashboard_cursor',
}

// These event types are always allowed, regardless of what features have been enabled
export const enabledEvents = new Set<UiAppEventType>([
    UiAppEventType.CUSTOM_EVENT,
    UiAppEventType.CONTEXT_CHANGE
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

export enum MenuItemType {
    LINK = 'link',
    EVENT = 'event'
}
