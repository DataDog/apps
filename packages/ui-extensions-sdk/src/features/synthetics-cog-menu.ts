import { FeatureType, EventType } from '../constants';
import { Feature } from '../types';

export const syntheticsCogMenu: Feature = {
    type: FeatureType.SYNTHETICS_COG_MENU,
    events: [EventType.SYNTHETICS_COG_MENU_CLICK]
};
