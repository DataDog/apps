import {
    EventType,
    FeatureType,
    enabledEvents,
    FeatureRenderType
} from '../constants';
import { features } from '../features';
import type {
    DefinitionWithKey,
    FramedFeatureWithOldDefinition,
    RenderedFeatureDefinition
} from '../types';

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
    feature: FeatureType,
    enabledFeatures: FeatureType[]
): boolean => enabledFeatures.includes(feature);

export const getFeatureTypesByEvent = memoize(
    (): Map<EventType, Set<FeatureType>> => {
        const featureTypesByEvent = new Map<EventType, Set<FeatureType>>();

        features.forEach(feature => {
            feature.events.forEach((e: EventType) => {
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
    event: EventType,
    enabledFeatures: FeatureType[]
): boolean => {
    if (enabledEvents.has(event)) {
        return true;
    }

    const featureTypesByEvent = getFeatureTypesByEvent();

    // get the set of features that enable this event
    const enablingFeatures = featureTypesByEvent.get(event as EventType);

    // if no enabling feature found, event is unknown
    if (!enablingFeatures) {
        return false;
    }

    return enabledFeatures.some(feature => enablingFeatures.has(feature));
};

export const isDefinitionWithKey = (
    defenition: any
): defenition is DefinitionWithKey => !!defenition.key;

export const validateKey = <T = any>(definition: T): boolean => {
    if (!isDefinitionWithKey(definition)) {
        throw new Error('Definition missing required field ".key"');
    }

    return true;
};

/**
 * Typescript utility type, takes an interface and makes the specified keys required
 * Example: RequireKeys<MyType, 'a' | 'b'>
 */
export type RequireKeys<T, K extends keyof T> = {
    [X in Exclude<keyof T, K>]?: T[X];
} &
    {
        [P in K]-?: T[P];
    };

const isFramedFeatureWithOldDefinition = (
    feature: FramedFeatureWithOldDefinition | RenderedFeatureDefinition
): feature is FramedFeatureWithOldDefinition => {
    return 'source' in feature || !('renderOptions' in feature);
};

export const unifyRenderedFeatureDefinitionForOOBComps = <
    T extends FramedFeatureWithOldDefinition,
    Q extends RenderedFeatureDefinition
>(
    feature: T | Q
): Q => {
    if (isFramedFeatureWithOldDefinition(feature)) {
        const { source, ...rest } = feature;
        return ({
            ...(rest as T),
            renderOptions: {
                type: FeatureRenderType.FRAME,
                source
            }
        } as unknown) as Q;
    }

    return feature as Q;
};
