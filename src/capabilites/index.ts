import { UiAppCapabilityType, UiAppEventType } from '../constants';

import { CapabilityManager } from './capabilityManager';

export type { CapabilityManager } from './capabilityManager';

class AppContextManager extends CapabilityManager {
    type = UiAppCapabilityType.APP_CONTEXT;
    events = [UiAppEventType.APP_CONTEXT];

    // This override should only be used for app_context since it's always enabled
    async isEnabled(): Promise<boolean> {
        return Promise.resolve(true);
    }

    getAdditionalClientMethods() {
        return {};
    }
}

class DashboardCogMenuManager extends CapabilityManager {
    type = UiAppCapabilityType.DASHBOARD_COG_MENU;
    events = [UiAppEventType.DASHBOARD_COG_MENU_CONTEXT];

    getAdditionalClientMethods() {
        return {};
    }
}

export const capabilityManagers = [AppContextManager, DashboardCogMenuManager];
