import { UiAppFeatureType, UiAppEventType } from '../constants';
import { UiAppFeature } from '../types';

export const modals: UiAppFeature = {
    type: UiAppFeatureType.MODALS,
    events: [
        UiAppEventType.MODAL_CLOSE,
        UiAppEventType.MODAL_CANCEL,
        UiAppEventType.MODAL_ACTION
    ]
};
