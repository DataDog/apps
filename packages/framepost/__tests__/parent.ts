import {
    MessageAPIVersion,
    MessageType,
    SerializationType
} from '../src/constants';
import { serialize } from '../src/utils';
import type { Message } from '../src';
import { ParentClient } from '../src';

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

class MockFrame {
    contentWindow: {
        postMessage: jest.Mock;
    };
    src: string;
    constructor() {
        this.contentWindow = {
            postMessage: jest.fn()
        };
        this.src = 'https://wikipedia.org';
    }
}

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

let mockFrame = new MockFrame();
let frame: HTMLIFrameElement;
let mockMessageChannel = new MockMessageChannel();
let messageChannel: MessageChannel;

const mockInitResponseFromChild = () => {
    const messageEvent = new MessageEvent<Message<ChildContext>>('message', {
        data: {
            type: MessageType.CHANNEL_INIT,
            serialization: SerializationType.NONE,
            apiVersion: MessageAPIVersion.v1,
            data: childContext,
            key: '',
            id: 'idididid'
        }
    });

    mockMessageChannel.port1.onmessage(messageEvent);
};

const mockEventFromChild = (key: string, data: any) => {
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

    mockMessageChannel.port1.onmessage(messageEvent);
};

const mockRequestFromChild = (key: string, data: any) => {
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

    mockMessageChannel.port1.onmessage(messageEvent);
};

const mockErrorResponseFromChild = (
    key: string,
    data: any,
    requestId: string
) => {
    const messageEvent = new MessageEvent<Message<any>>('message', {
        data: serialize({
            type: MessageType.ERROR_RESPONSE,
            apiVersion: MessageAPIVersion.v1,
            data,
            key,
            id: 'alfkejfl',
            requestId
        })
    });

    mockMessageChannel.port1.onmessage(messageEvent);
};

const mockResponseFromChild = (key: string, data: any, requestId: string) => {
    const messageEvent = new MessageEvent<Message<any>>('message', {
        data: {
            type: MessageType.RESPONSE,
            serialization: SerializationType.NONE,
            apiVersion: MessageAPIVersion.v1,
            data,
            key,
            id: 'alfkejfl',
            requestId
        }
    });

    mockMessageChannel.port1.onmessage(messageEvent);
};

beforeEach(() => {
    mockFrame = new MockFrame();
    mockMessageChannel = new MockMessageChannel();

    frame = (mockFrame as unknown) as HTMLIFrameElement;
    messageChannel = (mockMessageChannel as unknown) as MessageChannel;

    // @ts-ignore
    global.MessageChannel = class {
        constructor() {
            return messageChannel;
        }
    };
});

const flushPromises = () => new Promise(setImmediate);

test('Instantiates without error', () => {
    const client = new ParentClient();

    expect(client).toBeInstanceOf(ParentClient);
});

test('Sends a channel init message to the provided iframe on client.requestChannel', () => {
    const client = new ParentClient();

    client.requestChannel(frame, parentContext);

    expect(mockFrame.contentWindow?.postMessage).toHaveBeenCalledTimes(1);

    const [
        message,
        origin,
        [port2]
    ] = mockFrame.contentWindow?.postMessage.mock.calls[0];

    expect(message).toMatchObject({
        type: MessageType.CHANNEL_INIT,
        serialization: SerializationType.NONE,
        apiVersion: MessageAPIVersion.v1,
        data: parentContext,
        key: ''
    });

    expect(origin).toEqual('https://wikipedia.org');

    expect(port2).toEqual(mockMessageChannel.port2);
});

test('Rejects queued requests after timeout', async () => {
    const client = new ParentClient({ requestTimeout: 200 });

    client.requestChannel(frame, parentContext);

    let rejected = false;

    await new Promise(resolve => {
        client.getContext().catch(() => {
            rejected = true;
            resolve(undefined);
        });
    });

    expect(rejected).toBe(true);
});

test('Resolves requests to `getContext()` after receiving context from child client', async () => {
    const client = new ParentClient<ChildContext>();

    client.requestChannel(frame, parentContext);

    mockInitResponseFromChild();

    const context = await client.getContext();

    expect(context).toEqual(childContext);
});

test('Executes subscribed handlers when corresponding events are sent from the parent', async () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    const client = new ParentClient<ChildContext>();

    client.on('event1', callback1);
    client.on('event1', callback2);

    client.requestChannel(frame, parentContext);

    mockInitResponseFromChild();

    mockEventFromChild('event1', 'datalore');

    await flushPromises();

    expect(callback1).toBeCalled();
    expect(callback1.mock.calls[0][0]).toEqual('datalore');

    expect(callback2).toBeCalled();
    expect(callback2.mock.calls[0][0]).toEqual('datalore');
});

test('Unsubscribes handlers if unsubscribe hook is executed', async () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    const client = new ParentClient<ChildContext>();

    client.on('event1', callback1);
    const unsubscribe = client.on('event1', callback2);

    client.requestChannel(frame, parentContext);

    mockInitResponseFromChild();

    unsubscribe();

    mockEventFromChild('event1', 'datalore');

    await flushPromises();

    expect(callback1).toBeCalled();
    expect(callback1.mock.calls[0][0]).toEqual('datalore');

    expect(callback2).not.toBeCalled();
});

test('Sends events to child client after channel is established', async () => {
    const client = new ParentClient<ChildContext>();

    client.send('event1', 'data1');
    expect(mockMessageChannel.port1.postMessage).not.toHaveBeenCalled();

    client.requestChannel(frame, parentContext);

    client.send('event2', 'data2');
    expect(mockMessageChannel.port1.postMessage).not.toHaveBeenCalled();

    mockInitResponseFromChild();

    client.send('event3', 'data3');

    await flushPromises();

    expect(mockMessageChannel.port1.postMessage).toHaveBeenCalledTimes(3);

    expect(mockMessageChannel.port1.postMessage.mock.calls[0][0]).toMatchObject(
        {
            type: MessageType.EVENT,
            apiVersion: MessageAPIVersion.v1,
            key: 'event1',
            data: 'data1'
        }
    );

    expect(mockMessageChannel.port1.postMessage.mock.calls[1][0]).toMatchObject(
        {
            type: MessageType.EVENT,
            apiVersion: MessageAPIVersion.v1,
            key: 'event2',
            data: 'data2'
        }
    );

    expect(mockMessageChannel.port1.postMessage.mock.calls[2][0]).toMatchObject(
        {
            type: MessageType.EVENT,
            apiVersion: MessageAPIVersion.v1,
            key: 'event3',
            data: 'data3'
        }
    );
});

test('Serializes error instances when sent with postMessage', async () => {
    const client = new ParentClient<ChildContext>();
    client.requestChannel(frame, parentContext);

    const error1 = new Error('error1');
    client.send('event1', error1);
    expect(mockMessageChannel.port1.postMessage).not.toHaveBeenCalled();

    mockInitResponseFromChild();

    const error2 = new Error('error2');
    error2.name = 'MyError';
    error2.stack = 'My Error: blablah';
    client.send('event2', error2);

    await flushPromises();

    expect(mockMessageChannel.port1.postMessage).toHaveBeenCalledTimes(2);

    expect(mockMessageChannel.port1.postMessage.mock.calls[0][0]).toMatchObject(
        {
            type: MessageType.EVENT,
            serialization: SerializationType.ERROR,
            apiVersion: MessageAPIVersion.v1,
            key: 'event1',
            data: {
                message: 'error1',
                name: 'Error'
            }
        }
    );

    expect(mockMessageChannel.port1.postMessage.mock.calls[1][0]).toMatchObject(
        {
            type: MessageType.EVENT,
            serialization: SerializationType.ERROR,
            apiVersion: MessageAPIVersion.v1,
            key: 'event2',
            data: {
                message: 'error2',
                name: 'MyError',
                stack: 'My Error: blablah'
            }
        }
    );
});

test('Executes response handlers on appropriate request messages, returning returned data in new message', async () => {
    const callback1 = jest.fn(data => {
        return 'response1';
    });

    const client = new ParentClient<ChildContext>();

    client.onRequest('request1', callback1);

    client.requestChannel(frame, parentContext);

    mockInitResponseFromChild();

    mockRequestFromChild('request1', 'datalore');

    await flushPromises();

    expect(callback1).toBeCalled();
    expect(callback1.mock.calls[0][0]).toEqual('datalore');

    expect(mockMessageChannel.port1.postMessage.mock.calls[0][0]).toMatchObject(
        {
            type: MessageType.RESPONSE,
            apiVersion: MessageAPIVersion.v1,
            key: 'request1',
            data: 'response1',
            requestId: 'idididid'
        }
    );
});

test('Provides an unsubscribe hook for request handlers', async () => {
    const callback1 = jest.fn(() => {});

    const client = new ParentClient<ChildContext>();

    const unsubscribe = client.onRequest('request1', callback1);

    client.requestChannel(frame, parentContext);

    mockInitResponseFromChild();

    unsubscribe();

    mockRequestFromChild('request1', 'datalore');

    await flushPromises();

    expect(callback1).not.toBeCalled();
});

test('Resovles with data returned from handlers subscribed in the child client', async () => {
    const client = new ParentClient<ChildContext>();

    client.requestChannel(frame, parentContext);
    mockInitResponseFromChild();

    await flushPromises();

    setTimeout(() => {
        const requestId =
            mockMessageChannel.port1.postMessage.mock.calls[0][0].id;
        mockResponseFromChild('request', 'responseData', requestId);
    }, 500);

    const response = await client.request('request', 'requestData');

    expect(response).toEqual('responseData');
});

test('Rejects with data thrown from handlers subscribed in parent client', async () => {
    const client = new ParentClient<ChildContext>();

    client.requestChannel(frame, parentContext);
    mockInitResponseFromChild();

    await flushPromises();

    setTimeout(() => {
        const requestId =
            mockMessageChannel.port1.postMessage.mock.calls[0][0].id;
        mockErrorResponseFromChild('request', 'errorResponseData', requestId);
    }, 500);

    let response = '';

    try {
        await client.request('request', 'requestData');
    } catch (e) {
        response = e;
    }

    expect(response).toEqual('errorResponseData');
});

test('Propagates errors thrown from request handlers', async () => {
    const client = new ParentClient<ChildContext>();

    client.requestChannel(frame, parentContext);
    mockInitResponseFromChild();

    await flushPromises();

    setTimeout(() => {
        const requestId =
            mockMessageChannel.port1.postMessage.mock.calls[0][0].id;
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
    expect(response.message).toBe('errorResponseData');
});

test('Sends requests to child client after channel is established', async () => {
    const client = new ParentClient<ChildContext>();

    client.request('event1', 'data1');
    expect(mockMessageChannel.port1.postMessage).not.toHaveBeenCalled();

    client.requestChannel(frame, parentContext);

    client.request('event2', 'data2');
    expect(mockMessageChannel.port1.postMessage).not.toHaveBeenCalled();

    mockInitResponseFromChild();

    client.request('event3', 'data3');

    await flushPromises();

    expect(mockMessageChannel.port1.postMessage).toHaveBeenCalledTimes(3);

    expect(mockMessageChannel.port1.postMessage.mock.calls[0][0]).toMatchObject(
        {
            type: MessageType.REQUEST,
            apiVersion: MessageAPIVersion.v1,
            key: 'event1',
            data: 'data1'
        }
    );

    expect(mockMessageChannel.port1.postMessage.mock.calls[1][0]).toMatchObject(
        {
            type: MessageType.REQUEST,
            apiVersion: MessageAPIVersion.v1,
            key: 'event2',
            data: 'data2'
        }
    );

    expect(mockMessageChannel.port1.postMessage.mock.calls[2][0]).toMatchObject(
        {
            type: MessageType.REQUEST,
            apiVersion: MessageAPIVersion.v1,
            key: 'event3',
            data: 'data3'
        }
    );
});

test('Rejects unhandled requests after a timeout', async () => {
    const client = new ParentClient<ChildContext>({ requestTimeout: 200 });

    client.requestChannel(frame, parentContext);
    mockInitResponseFromChild();

    await flushPromises();

    let rejected = false;

    await new Promise(resolve => {
        client.request('request', 'requestData').catch(() => {
            rejected = true;
            resolve(undefined);
        });
    });

    expect(rejected).toBe(true);
});

test('Closes message port on calls to `destroy()`', () => {
    const client = new ParentClient<ChildContext>();

    client.requestChannel(frame, parentContext);

    client.destroy();

    expect(mockMessageChannel.port1.close).toHaveBeenCalled();
});
