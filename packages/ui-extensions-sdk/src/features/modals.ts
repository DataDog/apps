import { FeatureType, EventType } from '../constants';
import { Feature } from '../types';

export const modals: Feature = {
    type: FeatureType.MODALS,
    events: [
        EventType.MODAL_CLOSE,
        EventType.MODAL_CANCEL,
        EventType.MODAL_ACTION
    ]
};
