import { FeatureType, EventType } from '../constants';
import { Feature } from '../types';

export const sidePanels: Feature = {
    type: FeatureType.SIDE_PANELS,
    events: [EventType.SIDE_PANEL_CLOSE]
};
