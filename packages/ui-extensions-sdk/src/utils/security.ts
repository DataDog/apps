import { LoadedResourceMetadata, LoadedResourceMetaDataBatch } from '../types';

export type LoadedResourceIds = Set<string>;

const isPerformanceObjectSupported = () => {
    return window.performance !== undefined && 'getEntries' in performance;
};

const isResourceTimingEntry = (
    entry: PerformanceEntry
): entry is PerformanceResourceTiming => {
    return entry.entryType === 'resource';
};

const isRequestKind = (timing: PerformanceResourceTiming) => {
    return (
        timing.initiatorType === 'xmlhttprequest' ||
        timing.initiatorType === 'fetch'
    );
};

export const parseResource = (
    r: PerformanceResourceTiming
): LoadedResourceMetadata => {
    // safe because r.name represents the resolved URL of the requested resource.
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
};

const collectInitialResources = () =>
    performance
        .getEntriesByType('resource')
        .filter(isResourceTimingEntry)
        .map(parseResource);

export const startResourceMonitoring = (
    reportUsage: (batch: LoadedResourceMetaDataBatch) => void
): (() => void) => {
    if (!isPerformanceObjectSupported()) {
        return () => {};
    }

    // first, report all previously loaded resources
    reportUsage({ resources: collectInitialResources() });

    // now, set up observer for all new resources
    const observerCallback = (entries: PerformanceObserverEntryList) => {
        const resources = entries
            .getEntries()
            .filter(isResourceTimingEntry)
            .map(parseResource);

        reportUsage({ resources });
    };

    const observer = new PerformanceObserver(observerCallback);
    observer.observe({ type: 'resource', buffered: true });

    return () => {
        observer.disconnect();
    };
};
