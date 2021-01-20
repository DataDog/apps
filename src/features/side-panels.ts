import { UiAppFeatureType, UiAppEventType } from '../constants';
import { UiAppFeature } from '../types';

export const sidePanels: UiAppFeature = {
    type: UiAppFeatureType.SIDE_PANELS,
    events: [UiAppEventType.SIDE_PANEL_CLOSE, UiAppEventType.SIDE_PANEL_OPEN]
};
