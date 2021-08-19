import { FeatureType, EventType } from '../constants';
import { Feature } from '../types';

export const dashboardCustomWidget: Feature = {
    type: FeatureType.DASHBOARD_CUSTOM_WIDGET,
    events: [
        EventType.DASHBOARD_CUSTOM_WIDGET_OPTIONS_CHANGE,
        EventType.DASHBOARD_TEMPLATE_VAR_CHANGE,
        EventType.DASHBOARD_TIMEFRAME_CHANGE,
        EventType.DASHBOARD_CURSOR_CHANGE
    ]
};
