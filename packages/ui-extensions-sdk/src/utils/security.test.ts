import { parseResource } from './security';

const now = Date.now();

// mock performance.timeOrigin
const performance = { timeOrigin: now };
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

describe('collectResourceUsage.parseResource', () => {
    it('cast a image resource to PerformanceResourceTiming with url', () => {
        expect(parseResource(fakeImageResource)).toEqual({
            startTimeTs: now + fakeResourceTimingValues.startTime,
            secureConnectionStartTs:
                now + fakeResourceTimingValues.secureConnectionStart,
            url: 'http://localhost/image/1',
            urlHostname: 'localhost',
            initiatorType: 'image',
            nextHopProtocol: fakeResourceTimingValues.nextHopProtocol,
            duration: fakeResourceTimingValues.duration,
            decodedBodySize: fakeResourceTimingValues.decodedBodySize
        });
    });
    it('cast a request resource to PerformanceResourceTiming without url', () => {
        expect(parseResource(fakeRequestResource)).toEqual({
            startTimeTs: now + fakeResourceTimingValues.startTime,
            secureConnectionStartTs:
                now + fakeResourceTimingValues.secureConnectionStart,
            urlHostname: 'localhost',
            initiatorType: 'fetch',
            nextHopProtocol: fakeResourceTimingValues.nextHopProtocol,
            duration: fakeResourceTimingValues.duration,
            decodedBodySize: fakeResourceTimingValues.decodedBodySize
        });
    });
});
