import { UiAppCapabilityType, UiAppEventType } from '../constants';

import { CapabilityManager } from './capabilityManager';

export type { CapabilityManager } from './capabilityManager';

class DashboardCogMenuManager extends CapabilityManager {
    type = UiAppCapabilityType.DASHBOARD_COG_MENU;
    events = [UiAppEventType.DASHBOARD_COG_MENU_CONTEXT];

    getAdditionalClientMethods() {
        return {};
    }
}

export const capabilityManagers = [DashboardCogMenuManager];
