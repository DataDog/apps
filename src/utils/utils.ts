import { UiAppEventType, UiAppFeatureType, enabledEvents } from '../constants';
import { features } from '../features';

const memoize = <T>(getter: () => T): (() => T) => {
    let executed = false;
    let value: T;

    return () => {
        if (!executed) {
            value = getter();
            executed = true;
        }

        return value;
    };
};

export const isFeatureEnabled = (
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
            feature.events.forEach((e: UiAppEventType) => {
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
    event: UiAppEventType,
    enabledFeatures: UiAppFeatureType[]
): boolean => {
    if (enabledEvents.has(event)) {
        return true;
    }

    const featureTypesByEvent = getFeatureTypesByEvent();

    // get the set of features that enable this event
    const enablingFeatures = featureTypesByEvent.get(event as UiAppEventType);

    // if no enabling feature found, event is unknown
    if (!enablingFeatures) {
        return false;
    }

    return enabledFeatures.some(feature => enablingFeatures.has(feature));
};
