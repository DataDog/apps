import { setImmediate } from 'timers';

import {
    MessageAPIVersion,
    MessageType,
    SerializationType
} from '../src/constants';
import {
    ClientDestroyedError,
    HandshakeTimeoutError,
    RequestTimeoutError
} from '../src/errors';
import { serialize } from '../src/utils';
import type { Message } from '../src';
import { ChildClient } from '../src';

interface ParentContext {
    parentData: string;
}

interface ChildContext {
    childData: string;
}

const parentContext: ParentContext = {
    parentData: 'data'
};

const childContext: ChildContext = {
    childData: 'data'
};

class MockMessagePort {
    postMessage: jest.Mock;
    close: jest.Mock;
    onmessage: (ev: MessageEvent) => void;

    constructor() {
        this.postMessage = jest.fn();
        this.close = jest.fn();
        this.onmessage = () => {};
    }
}

class MockMessageChannel {
    port1: MockMessagePort;
    port2: MockMessagePort;

    constructor() {
        this.port1 = new MockMessagePort();
        this.port2 = new MockMessagePort();
    }
}

let mockMessageChannel = new MockMessageChannel();
let messageChannel: MessageChannel;
let client: ChildClient;

const mockInitMessageFromParent = () => {
    const messageEvent = new MessageEvent<Message<ParentContext>>('message', {
        data: {
            type: MessageType.CHANNEL_INIT,
            serialization: SerializationType.NONE,
            apiVersion: MessageAPIVersion.v1,
            data: parentContext,
            key: '',
            id: 'idididid'
        },
        ports: [messageChannel.port2]
    });

    global.window.dispatchEvent(messageEvent);
};

const mockEventFromParent = (key: string, data: any) => {
    const messageEvent = new MessageEvent<Message<any>>('message', {
        data: {
            type: MessageType.EVENT,
            serialization: SerializationType.NONE,
            apiVersion: MessageAPIVersion.v1,
            data,
            key,
            id: 'idididid'
        }
    });

    mockMessageChannel.port2.onmessage(messageEvent);
};

const mockRequestFromParent = (key: string, data: any) => {
    const messageEvent = new MessageEvent<Message<any>>('message', {
        data: {
            type: MessageType.REQUEST,
            serialization: SerializationType.NONE,
            apiVersion: MessageAPIVersion.v1,
            data,
            key,
            id: 'idididid'
        }
    });

    mockMessageChannel.port2.onmessage(messageEvent);
};

const mockResponseFromParent = (key: string, data: any, requestId: string) => {
    const messageEvent = new MessageEvent<Message<any>>('message', {
        data: serialize({
            type: MessageType.RESPONSE,
            apiVersion: MessageAPIVersion.v1,
            data,
            key,
            id: 'alfkejfl',
            requestId
        })
    });

    mockMessageChannel.port2.onmessage(messageEvent);
};

const mockErrorResponseFromChild = (
    key: string,
    data: any,
    requestId: string
) => {
    const messageEvent = new MessageEvent<Message<any>>('message', {
        data: {
            type: MessageType.ERROR_RESPONSE,
            serialization: SerializationType.NONE,
            apiVersion: MessageAPIVersion.v1,
            data,
            key,
            id: 'alfkejfl',
            requestId
        }
    });

    mockMessageChannel.port2.onmessage(messageEvent);
};

beforeEach(() => {
    mockMessageChannel = new MockMessageChannel();

    messageChannel = (mockMessageChannel as unknown) as MessageChannel;

    // @ts-ignore
    global.MessageChannel = class {
        constructor() {
            return messageChannel;
        }
    };
});

const flushPromises = () => new Promise(setImmediate);

describe('client', () => {
    test('Instantiates without error', () => {
        client = new ChildClient();

        expect(client).toBeInstanceOf(ChildClient);

        client.destroy();
    });

    test('Responds correctly to channel init message', () => {
        client = new ChildClient({
            context: childContext
        });

        mockInitMessageFromParent();

        expect(mockMessageChannel.port2.postMessage).toBeCalledTimes(1);

        expect(
            mockMessageChannel.port2.postMessage.mock.calls[0][0]
        ).toMatchObject({
            type: MessageType.CHANNEL_INIT,
            serialization: SerializationType.NONE,
            apiVersion: MessageAPIVersion.v1,
            key: '',
            data: childContext
        });
    });
});

describe('client.getContext()', () => {
    test('Returns null if handshake fails. Does not reject', async () => {
        client = new ChildClient({
            requestTimeout: 200
        });

        const context = await client.getContext();

        expect(context).toBe(null);
    });

    test('Resolves requests after receiving context from child client', async () => {
        client = new ChildClient<ParentContext>();

        mockInitMessageFromParent();

        const context = await client.getContext();

        expect(context).toEqual(parentContext);
    });
});

describe('client.handshake()', () => {
    test('Rejects if handshake times out', async () => {
        client = new ChildClient({
            requestTimeout: 200
        });

        const error = await new Promise(resolve => {
            client.handshake().catch(e => {
                resolve(e);
            });
        });

        expect(error).toBeInstanceOf(HandshakeTimeoutError);
    });

    test('Rejects after client is destroyed', async () => {
        client = new ChildClient<ParentContext>();

        mockInitMessageFromParent();

        client.destroy();

        const error = await new Promise(resolve => {
            client.handshake().catch(e => {
                resolve(e);
            });
        });

        expect(error).toBeInstanceOf(ClientDestroyedError);
    });
});

describe('client.on()', () => {
    test('Executes subscribed handlers when corresponding events are sent from the parent', async () => {
        const callback1 = jest.fn();
        const callback2 = jest.fn();

        client = new ChildClient<ParentContext>();

        client.on('event1', callback1);
        client.on('event1', callback2);

        mockInitMessageFromParent();

        mockEventFromParent('event1', 'datalore');

        await flushPromises();

        expect(callback1).toBeCalled();
        expect(callback1.mock.calls[0][0]).toEqual('datalore');

        expect(callback2).toBeCalled();
        expect(callback2.mock.calls[0][0]).toEqual('datalore');
    });

    test('Unsubscribes handlers if unsubscribe hook is executed', async () => {
        const callback1 = jest.fn();
        const callback2 = jest.fn();

        client = new ChildClient<ParentContext>();

        client.on('event1', callback1);
        const unsubscribe = client.on('event1', callback2);

        mockInitMessageFromParent();

        unsubscribe();

        mockEventFromParent('event1', 'datalore');

        await flushPromises();

        expect(callback1).toBeCalled();
        expect(callback1.mock.calls[0][0]).toEqual('datalore');

        expect(callback2).not.toBeCalled();
    });
});

describe('client.send()', () => {
    test('Sends events to parent client after channel is established', async () => {
        client = new ChildClient<ParentContext>();

        client.send('event1', 'data1');
        expect(mockMessageChannel.port1.postMessage).not.toHaveBeenCalled();

        mockInitMessageFromParent();

        client.send('event2', 'data2');

        await flushPromises();

        expect(mockMessageChannel.port2.postMessage).toHaveBeenCalledTimes(3);

        expect(
            mockMessageChannel.port2.postMessage.mock.calls[1][0]
        ).toMatchObject({
            type: MessageType.EVENT,
            serialization: SerializationType.NONE,
            apiVersion: MessageAPIVersion.v1,
            key: 'event1',
            data: 'data1'
        });

        expect(
            mockMessageChannel.port2.postMessage.mock.calls[2][0]
        ).toMatchObject({
            type: MessageType.EVENT,
            serialization: SerializationType.NONE,
            apiVersion: MessageAPIVersion.v1,
            key: 'event2',
            data: 'data2'
        });
    });

    test('Serializes error instances when sent with postMessage', async () => {
        client = new ChildClient<ParentContext>();

        const error1 = new Error('error1');
        client.send('event1', error1);
        expect(mockMessageChannel.port1.postMessage).not.toHaveBeenCalled();

        mockInitMessageFromParent();

        const error2 = new Error('error2');
        error2.name = 'MyError';
        error2.stack = 'My Error: blablah';
        client.send('event2', error2);

        await flushPromises();

        expect(mockMessageChannel.port2.postMessage).toHaveBeenCalledTimes(3);

        expect(
            mockMessageChannel.port2.postMessage.mock.calls[1][0]
        ).toMatchObject({
            type: MessageType.EVENT,
            serialization: SerializationType.ERROR,
            apiVersion: MessageAPIVersion.v1,
            key: 'event1',
            data: {
                message: 'error1',
                name: 'Error'
            }
        });

        expect(
            mockMessageChannel.port2.postMessage.mock.calls[2][0]
        ).toMatchObject({
            type: MessageType.EVENT,
            serialization: SerializationType.ERROR,
            apiVersion: MessageAPIVersion.v1,
            key: 'event2',
            data: {
                message: 'error2',
                name: 'MyError',
                stack: 'My Error: blablah'
            }
        });
    });

    test('does not throw if handshake fails', async () => {
        client = new ChildClient({
            requestTimeout: 200
        });

        const message = await client.send('event1', 'data');

        expect(message).toBe(null);
    });
});

test('Executes response handlers on appropriate request messages, returning returned data in new message', async () => {
    const callback1 = jest.fn(data => {
        return 'response1';
    });

    client = new ChildClient<ParentContext>();

    client.onRequest('request1', callback1);

    mockInitMessageFromParent();

    mockRequestFromParent('request1', 'datalore');

    await flushPromises();

    expect(callback1).toBeCalled();
    expect(callback1.mock.calls[0][0]).toEqual('datalore');

    expect(mockMessageChannel.port2.postMessage.mock.calls[1][0]).toMatchObject(
        {
            type: MessageType.RESPONSE,
            serialization: SerializationType.NONE,
            apiVersion: MessageAPIVersion.v1,
            key: 'request1',
            data: 'response1',
            requestId: 'idididid'
        }
    );
});

test('Provides an unsubscribe hook for request handlers', async () => {
    const callback1 = jest.fn(() => {});

    client = new ChildClient<ParentContext>();

    const unsubscribe = client.onRequest('request1', callback1);

    mockInitMessageFromParent();

    unsubscribe();

    mockRequestFromParent('request1', 'datalore');

    await flushPromises();

    expect(callback1).not.toBeCalled();
});

test('Resovles with data returned from handlers subscribed in the parent client', async () => {
    client = new ChildClient<ParentContext>();

    mockInitMessageFromParent();

    await flushPromises();

    setTimeout(() => {
        const requestId =
            mockMessageChannel.port2.postMessage.mock.calls[1][0].id;
        mockResponseFromParent('request', 'responseData', requestId);
    }, 500);

    const response = await client.request('request', 'requestData');

    expect(response).toEqual('responseData');
});

test('Rejects with data thrown from handlers subscribed in parent client', async () => {
    client = new ChildClient<ParentContext>();

    mockInitMessageFromParent();

    await flushPromises();

    setTimeout(() => {
        const requestId =
            mockMessageChannel.port2.postMessage.mock.calls[1][0].id;
        mockErrorResponseFromChild('request', 'errorResponseData', requestId);
    }, 500);

    let response: unknown = '';

    try {
        await client.request('request', 'requestData');
    } catch (e) {
        response = e;
    }

    expect(response).toEqual('errorResponseData');
});

test('Propagates errors thrown from request handlers', async () => {
    client = new ChildClient<ParentContext>();

    mockInitMessageFromParent();

    await flushPromises();

    setTimeout(() => {
        const requestId =
            mockMessageChannel.port2.postMessage.mock.calls[1][0].id;
        mockErrorResponseFromChild(
            'request',
            new Error('errorResponseData'),
            requestId
        );
    }, 500);

    let response = null;

    try {
        await client.request('request', 'requestData');
    } catch (e) {
        response = e;
    }

    expect(response).toBeInstanceOf(Error);
    expect((response as Error).message).toBe('errorResponseData');
});

test('Sends requests to child client after channel is established', async () => {
    client = new ChildClient<ChildContext>();

    client.request('event1', 'data1');
    expect(mockMessageChannel.port1.postMessage).not.toHaveBeenCalled();

    mockInitMessageFromParent();

    client.request('event2', 'data2');

    await flushPromises();

    expect(mockMessageChannel.port2.postMessage).toHaveBeenCalledTimes(3);

    expect(mockMessageChannel.port2.postMessage.mock.calls[1][0]).toMatchObject(
        {
            type: MessageType.REQUEST,
            apiVersion: MessageAPIVersion.v1,
            key: 'event1',
            data: 'data1'
        }
    );

    expect(mockMessageChannel.port2.postMessage.mock.calls[2][0]).toMatchObject(
        {
            type: MessageType.REQUEST,
            apiVersion: MessageAPIVersion.v1,
            key: 'event2',
            data: 'data2'
        }
    );
});

test('Rejects unhandled requests after a timeout', async () => {
    client = new ChildClient<ChildContext>({ requestTimeout: 200 });

    mockInitMessageFromParent();

    await flushPromises();

    const error = await new Promise(resolve => {
        client.request('request', 'requestData').catch(e => {
            resolve(e);
        });
    });

    expect(error).toBeInstanceOf(RequestTimeoutError);
});

describe('client.destroy()', () => {
    test('Closes message port on calls to `destroy()`', async () => {
        client = new ChildClient<ChildContext>();

        mockInitMessageFromParent();

        await flushPromises();

        client.destroy();

        expect(mockMessageChannel.port2.close).toHaveBeenCalled();
    });

    test('Rejects handshake if it has not been completed', async () => {
        client = new ChildClient<ChildContext>();

        client.destroy();

        const error = await new Promise(resolve => {
            client.handshake().catch(e => {
                resolve(e);
            });
        });

        expect(error).toBeInstanceOf(ClientDestroyedError);
    });

    test('Rejects handshake even after it has been completed', async () => {
        client = new ChildClient<ChildContext>();
        mockInitMessageFromParent();
        flushPromises();

        client.destroy();

        const error = await new Promise(resolve => {
            client.handshake().catch(e => {
                resolve(e);
            });
        });

        expect(error).toBeInstanceOf(ClientDestroyedError);
    });

    test('Rejects all unresolved requests', async () => {
        client = new ChildClient<ChildContext>();
        mockInitMessageFromParent();

        const r1 = client.request('request1', 'data1');

        client.destroy();

        // doing one after 'destroy' to test that new requests also fail
        const r2 = client.request('request2', 'data2');

        const e1 = await new Promise(resolve => {
            r1.catch(e => {
                resolve(e);
            });
        });

        const e2 = await new Promise(resolve => {
            r2.catch(e => {
                resolve(e);
            });
        });

        expect(e1).toBeInstanceOf(ClientDestroyedError);
        expect(e2).toBeInstanceOf(ClientDestroyedError);
    });
});
