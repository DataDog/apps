import {
    UiAppCapabilityType,
    UiAppEventToSubscribeType,
    UiAppEventToTriggerType
} from '../constants';

import { CapabilityManager } from './capabilityManager';

export type { CapabilityManager } from './capabilityManager';

class DashboardCogMenuManager extends CapabilityManager {
    type = UiAppCapabilityType.DASHBOARD_COG_MENU;
    eventsToSubscribe = [UiAppEventToSubscribeType.DASHBOARD_COG_MENU_CONTEXT];
    eventsToTrigger = [];

    getAdditionalClientMethods() {
        return {};
    }
}

class AppRoutingManager extends CapabilityManager {
    type = UiAppCapabilityType.APP_ROUTING;
    eventsToSubscribe = [];
    eventsToTrigger = [
        UiAppEventToTriggerType.RELOAD_FRAME,
        UiAppEventToTriggerType.OPEN_URL
    ];

    getAdditionalClientMethods() {
        return {};
    }
}

class DashboardCustomWidgetManager extends CapabilityManager {
    type = UiAppCapabilityType.DASHBOARD_CUSTOM_WIDGET;
    eventsToSubscribe = [];
    eventsToTrigger = [];

    getAdditionalClientMethods() {
        return {};
    }
}

export const capabilityManagers = [
    DashboardCogMenuManager,
    AppRoutingManager,
    DashboardCustomWidgetManager
];
