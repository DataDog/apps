export enum Host {
    PROD = 'https://app.datadoghq.com/',
    STAGE = 'https://dd.datad0g.com/'
}

export enum UiAppCapabilityType {
    APP_CONTEXT = 'app_context',
    DASHBOARD_COG_MENU = 'dashboard_cog_menu',
    DASHBOARD_CUSTOM_WIDGET = 'dashboard_custom_widget',
    APP_ROUTING = 'app_routing'
}

export enum UiAppEventToSubscribeType {
    DASHBOARD_COG_MENU_CONTEXT = 'dashboard_cog_menu_context'
}
export enum UiAppEventToTriggerType {
    RELOAD_FRAME = 'reload_frame',
    OPEN_URL = 'open_url'
}
