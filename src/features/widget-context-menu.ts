import { UiAppFeatureType, UiAppEventType } from '../constants';
import { UiAppFeature } from '../types';

export const widgetContextMenu: UiAppFeature = {
    type: UiAppFeatureType.WIDGET_CONTEXT_MENU,
    events: [UiAppEventType.WIDGET_CONTEXT_MENU_CLICK]
};
