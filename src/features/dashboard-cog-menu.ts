import { UiAppFeatureType, UiAppEventType } from '../constants';
import { UiAppFeature } from '../types';

export const dashboardCogMenu: UiAppFeature = {
    type: UiAppFeatureType.DASHBOARD_COG_MENU,
    events: [UiAppEventType.DASHBOARD_COG_MENU_CONTEXT]
};
