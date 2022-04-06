import { LoadedResourceMetaDataBatch, NetworkRequestMetadata } from '../types';

export type LoadedResourceIds = Set<string>;

export const collectResourceUsage = (
    previouslyLoadedResources: LoadedResourceIds
): [LoadedResourceMetaDataBatch, LoadedResourceIds] => {
    // Use resource timing api to to retrieve application loaded resources
    const snapshot = performance.getEntriesByType('resource');

    // to avoid collecting the same resource twice, we use
    // the Set difference: snapshot - previouslyLoadedResources
    const resources = snapshot
        .filter(r => !previouslyLoadedResources.has(r.name))
        .map(e => {
            const a = e as PerformanceResourceTiming;
            const urlHostname = new URL(a.name).hostname;
            let url;
            if (
                a.initiatorType !== 'fetch' &&
                a.initiatorType !== 'xhrequest'
            ) {
                // for privacy reason we do not capture full URLs of network calls
                url = a.name;
            }
            return {
                url,
                urlHostname,
                initiatorType: a.initiatorType,
                nextHopProtocol: a.nextHopProtocol
            };
        });

    return [{ resources }, new Set(snapshot.map(x => x.name))];
};

export const registerNetworkRequestListeners = (
    onNetworkRequest: (request: NetworkRequestMetadata) => void
): (() => void) => {
    // TODO: monitor network requests, call `onNetworkRequest' as needed
    // onNetworkRequest({});

    // TODO: It's good practice to return a 'cleanup' hook that removes the event listeners you've set up
    return () => {
        // remove listeners
    };
};
