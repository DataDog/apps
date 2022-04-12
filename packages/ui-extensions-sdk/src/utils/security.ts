import { LoadedResourceMetaDataBatch } from '../types';

export type LoadedResourceIds = Set<string>;

function isRequestKind(timing: PerformanceResourceTiming) {
    return (
        timing.initiatorType === 'xmlhttprequest' ||
        timing.initiatorType === 'fetch'
    );
}

export const collectResourceUsage = (
    previouslyLoadedResources: LoadedResourceIds
): [LoadedResourceMetaDataBatch, LoadedResourceIds] => {
    // Use resource timing api to to retrieve application loaded resources
    const snapshot = performance.getEntriesByType('resource');

    const resources = snapshot
        // to avoid collecting the same resource twice, we use
        // the Set difference: snapshot - previousSnapshot
        .filter(r => !previouslyLoadedResources.has(r.name))
        .map(r => r as PerformanceNavigationTiming)
        .map(r => {
            const urlHostname = new URL(r.name).hostname;
            const ts = performance.timeOrigin;
            let url;
            if (!isRequestKind(r)) {
                // for privacy reason we do not capture full URLs of network calls
                url = r.name;
            }
            return {
                startTimeTs: ts + r.startTime,
                secureConnectionStartTs: ts + r.secureConnectionStart,
                url,
                urlHostname,
                initiatorType: r.initiatorType,
                nextHopProtocol: r.nextHopProtocol,
                duration: r.duration,
                decodedBodySize: r.decodedBodySize
            };
        });

    return [{ resources }, new Set(snapshot.map(r => r.name))];
};
