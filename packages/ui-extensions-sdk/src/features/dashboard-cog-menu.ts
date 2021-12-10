import { FeatureType, EventType } from '../constants';
import { Feature } from '../types';

export const dashboardCogMenu: Feature = {
    type: FeatureType.DASHBOARD_COG_MENU,
    events: [EventType.DASHBOARD_COG_MENU_CLICK]
};
