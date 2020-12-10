import { UiAppFeatureType, UiAppEventType } from '../constants';
import { UiAppFeature } from '../types';

export const dashboardCustomWidget: UiAppFeature = {
    type: UiAppFeatureType.DASHBOARD_CUSTOM_WIDGET,
    events: [
        UiAppEventType.DASHBOARD_CUSTOM_WIDGET_OPTIONS_CHANGE,
        UiAppEventType.DASHBOARD_TEMPLATE_VAR_CHANGE,
        UiAppEventType.DASHBOARD_TIMEFRAME_CHANGE
    ]
};
