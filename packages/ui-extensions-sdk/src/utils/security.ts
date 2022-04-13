import { RESOURCE_BATCH_INTERVAL } from '../constants';
import { LoadedResourceMetaDataBatch } from '../types';

import { setImmediateInterval } from './utils';

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

export const collectResourceUsage = (
    previouslyLoadedResources: LoadedResourceIds
): [LoadedResourceMetaDataBatch, LoadedResourceIds] => {
    // Use resource timing api to to retrieve application loaded resources
    const snapshot = performance.getEntriesByType('resource');

    const resources = snapshot
        .filter(isResourceTimingEntry)
        // to avoid collecting the same resource twice, we use
        // the Set difference: snapshot - previousSnapshot
        .filter(r => !previouslyLoadedResources.has(r.name))
        .map(r => {
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
        });

    return [{ resources }, new Set(snapshot.map(r => r.name))];
};

export const startResourceMonitoring = (
    reportUsage: (batch: LoadedResourceMetaDataBatch) => void
): (() => void) => {
    let loadedResourceIds: LoadedResourceIds = new Set();

    if (!isPerformanceObjectSupported()) {
        return () => {};
    }

    const doResourceCollection = () => {
        // collect batch of resource-loading data
        const [batch, newIds] = collectResourceUsage(loadedResourceIds);

        // update index of loaded resources
        loadedResourceIds = newIds;

        // send to web-ui
        reportUsage(batch);
    };

    const interval = setImmediateInterval(() => {
        try {
            doResourceCollection();
        } catch (e) {
            // Stop batch collecting if there's an error
            clearInterval(interval);
        }
    }, RESOURCE_BATCH_INTERVAL);

    let bufferFullHandler = () => {};

    if ('addEventListener' in performance) {
        bufferFullHandler = () => {
            // ensure we collect the last resources before clearing the buffer
            doResourceCollection();
            performance.clearResourceTimings();
        };

        performance.addEventListener(
            'resourcetimingbufferfull',
            bufferFullHandler
        );
    }

    return () => {
        clearInterval(interval);
        if ('addEventListener' in performance) {
            performance.removeEventListener(
                'resourcetimingbufferfull',
                bufferFullHandler
            );
        }
    };
};
