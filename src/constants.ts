export enum Host {
    PROD = 'https://app.datadoghq.com/',
    STAGE = 'https://dd.datad0g.com/'
}

export enum UiAppFeatureType {
    DASHBOARD_COG_MENU = 'dashboard_cog_menu',
    DASHBOARD_CUSTOM_WIDGET = 'dashboard_custom_widget',
    DASHBOARD_PAGE_CONTEXT = 'dashboard_page_context',
    APP_ROUTING = 'app_routing'
}

export enum UiAppEventToSubscribeType {
    DASHBOARD_COG_MENU_CONTEXT = 'dashboard_cog_menu_context',
    DASHBOARD_TIMEFRAME_CHANGE = 'dashboard_timeframe_change',
    DASHBOARD_TEMPLATE_VAR_CHANGE = 'dashboard_template_var_change',
    DASHBOARD_CUSTOM_WIDGET_OPTIONS_CHANGE = 'dashboard_custom_widget_options_change'
}
export enum UiAppEventToTriggerType {
    RELOAD_FRAME = 'reload_frame',
    OPEN_URL = 'open_url'
}

export enum IFrameApiRequestMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

export enum IFrameApiRequestErrorType {
    INVALID_SCOPE = 'invalid_scope',
    INTERNAL_ERROR = 'internal_error',
    FAILED_REQUEST = 'failed_request'
}

// "Requests" are distinct from events in that the sdk client expects a response
// from the frameManager, or vice-versa
export enum UiAppRequestType {
    API_REQUEST = 'api_request'
}
