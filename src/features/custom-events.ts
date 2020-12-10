import { UiAppFeatureType, UiAppEventType } from '../constants';
import { UiAppFeature } from '../types';

export const customEvents: UiAppFeature = {
    type: UiAppFeatureType.CUSTOM_EVENTS,
    events: [UiAppEventType.CUSTOM_EVENT]
};
