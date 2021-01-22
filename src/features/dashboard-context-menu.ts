import { UiAppFeatureType, UiAppEventType } from '../constants';
import { UiAppFeature } from '../types';

export const dashboardContextMenu: UiAppFeature = {
    type: UiAppFeatureType.DASHBOARD_CONTEXT_MENU,
    events: [UiAppEventType.DASHBOARD_CONTEXT_MENU_CLICK]
};
