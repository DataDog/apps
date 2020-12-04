import { features } from '.';

import { UiAppEventType, UiAppFeatureType } from '../constants';
import { memoize } from '../utils/utils';

export const isEnabled = (
    feature: UiAppFeatureType,
    enabledFeatures: UiAppFeatureType[]
): boolean => enabledFeatures.includes(feature);

export const getFeatureTypesByEvent = memoize(
    (): Map<UiAppEventType, Set<UiAppFeatureType>> => {
        const featureTypesByEvent = new Map<
            UiAppEventType,
            Set<UiAppFeatureType>
        >();

        features.forEach(feature => {
            feature.events.forEach(e => {
                if (!featureTypesByEvent.has(e)) {
                    featureTypesByEvent.set(e, new Set());
                }

                featureTypesByEvent.get(e)!.add(feature.type);
            });
        });

        return featureTypesByEvent;
    }
);

export const isEventEnabled = (
    event: UiAppEventType | string,
    enabledFeatures: UiAppFeatureType[]
): boolean => {
    const featureTypesByEvent = getFeatureTypesByEvent();

    // get the set of features that enable this event
    const enablingFeatures = featureTypesByEvent.get(event as UiAppEventType);

    if (!enablingFeatures) {
        return true;
    }

    return enabledFeatures.some(feature => enablingFeatures.has(feature));
};
