import { FeatureType, EventType } from '../constants';
import { Feature } from '../types';

export const widgetContextMenu: Feature = {
    type: FeatureType.WIDGET_CONTEXT_MENU,
    events: [EventType.WIDGET_CONTEXT_MENU_CLICK]
};
