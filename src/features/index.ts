import {
    UiAppFeatureType,
    UiAppEventToSubscribeType,
    UiAppEventToTriggerType
} from '../constants';

import { FeatureManager } from './featureManager';

export type { FeatureManager } from './featureManager';

class DashboardCogMenuManager extends FeatureManager {
    type = UiAppFeatureType.DASHBOARD_COG_MENU;
    eventsToSubscribe = [UiAppEventToSubscribeType.DASHBOARD_COG_MENU_CONTEXT];
    eventsToTrigger = [];

    getAdditionalClientMethods() {
        return {};
    }
}

class AppRoutingManager extends FeatureManager {
    type = UiAppFeatureType.APP_ROUTING;
    eventsToSubscribe = [];
    eventsToTrigger = [
        UiAppEventToTriggerType.RELOAD_FRAME,
        UiAppEventToTriggerType.OPEN_URL
    ];

    getAdditionalClientMethods() {
        return {};
    }
}

class DashboardCustomWidgetManager extends FeatureManager {
    type = UiAppFeatureType.DASHBOARD_CUSTOM_WIDGET;
    eventsToSubscribe = [
        UiAppEventToSubscribeType.DASHBOARD_CUSTOM_WIDGET_OPTIONS_CHANGE,
        UiAppEventToSubscribeType.DASHBOARD_TEMPLATE_VAR_CHANGE,
        UiAppEventToSubscribeType.DASHBOARD_TIMEFRAME_CHANGE
    ];
    eventsToTrigger = [];

    getAdditionalClientMethods() {
        return {};
    }
}

export const featureManagers = [
    DashboardCogMenuManager,
    AppRoutingManager,
    DashboardCustomWidgetManager
];
