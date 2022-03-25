import { LoadedResourceMetaDataBatch, NetworkRequestMetadata } from '../types';

// TODO: Feel free to pass in whatever data structure you need
// to track what has been previously loaded. Here I'm assuming it will be a set of
// string ids
export type LoadedResourceIds = Set<string>;

export const collectResourceUsage = (
    previouslyLoadedResources: LoadedResourceIds
): [LoadedResourceMetaDataBatch, LoadedResourceIds] => {
    const newLoadedResourceIds = new Set(previouslyLoadedResources);

    // TODO: Do batch collection of resource data
    // TODO: Update list of preivously loaded resource ids

    return [{ resources: [] }, newLoadedResourceIds];
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
