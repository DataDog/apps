import { collectResourceUsage } from './security';

const now = Date.now();

const performance = {
    getEntriesByType: jest.fn(),
    timeOrigin: now
};

Object.defineProperty(window, 'performance', {
    configurable: true,
    enumerable: true,
    value: performance,
    writable: true
});

const fakeResourceTimingValues = {
    connectStart: now + 1,
    connectEnd: now + 1,
    domainLookupStart: now + 1,
    domainLookupEnd: now + 1,
    fetchStart: now + 1,
    redirectEnd: 0,
    redirectStart: 0,
    requestStart: now + 1,
    responseStart: now + 2,
    responseEnd: now + 30,
    secureConnectionStart: 0,
    decodedBodySize: 0,
    encodedBodySize: 0,
    nextHopProtocol: 'http',
    serverTiming: [],
    transferSize: 0,
    workerStart: 0,
    toJSON() {
        throw new Error('Function not implemented.');
    },
    duration: 0,
    startTime: 0,
    entryType: 'resource'
};

const fakeImageResource: PerformanceResourceTiming = {
    ...fakeResourceTimingValues,
    ...{
        initiatorType: 'image',
        name: 'http://localhost/image/1'
    }
};

const fakeRequestResource: PerformanceResourceTiming = {
    ...fakeResourceTimingValues,
    ...{
        initiatorType: 'fetch',
        name: 'http://localhost/api/1'
    }
};

beforeEach(() => {
    performance.getEntriesByType.mockReset();
});

describe('collectResourceUsage', () => {
    it('returns empty result if getEntriesByType is empty', () => {
        performance.getEntriesByType.mockReturnValueOnce([]);
        const [batch, newIds] = collectResourceUsage(new Set());
        expect(batch).toEqual({ resources: [] });
        expect(newIds).toEqual(new Set());
    });

    it('returns empty result if getEntriesByType returns already seen resources', () => {
        performance.getEntriesByType.mockReturnValueOnce([
            fakeImageResource,
            fakeRequestResource
        ]);
        const alreadySeen = new Set([
            'http://localhost/image/1',
            'http://localhost/api/1'
        ]);
        const [batch, newIds] = collectResourceUsage(alreadySeen);
        expect(batch).toEqual({ resources: [] });
        expect(newIds).toEqual(alreadySeen);
    });

    it('returns image resource not found before', () => {
        performance.getEntriesByType.mockReturnValueOnce([fakeImageResource]);
        const [batch, newIds] = collectResourceUsage(
            new Set(['http://localhost/image/2'])
        );
        expect(batch).toEqual({
            resources: [
                {
                    startTimeTs: now + fakeResourceTimingValues.startTime,
                    secureConnectionStartTs:
                        now + fakeResourceTimingValues.secureConnectionStart,
                    url: 'http://localhost/image/1',
                    urlHostname: 'localhost',
                    initiatorType: 'image',
                    nextHopProtocol: fakeResourceTimingValues.nextHopProtocol,
                    duration: fakeResourceTimingValues.duration,
                    decodedBodySize: fakeResourceTimingValues.decodedBodySize
                }
            ]
        });
        expect(newIds).toEqual(new Set(['http://localhost/image/1']));
    });

    it('returns fetch resource not found before, and redact URL field', () => {
        performance.getEntriesByType.mockReturnValueOnce([fakeRequestResource]);
        const [batch, newIds] = collectResourceUsage(new Set());
        expect(batch).toEqual({
            resources: [
                {
                    startTimeTs: now + fakeResourceTimingValues.startTime,
                    secureConnectionStartTs:
                        now + fakeResourceTimingValues.secureConnectionStart,
                    urlHostname: 'localhost',
                    initiatorType: 'fetch',
                    nextHopProtocol: fakeResourceTimingValues.nextHopProtocol,
                    duration: fakeResourceTimingValues.duration,
                    decodedBodySize: fakeResourceTimingValues.decodedBodySize
                }
            ]
        });
        expect(newIds).toEqual(new Set(['http://localhost/api/1']));
    });
});
