import { MessageAPIVersion, MessageType } from '../src/constants';
import { ChildClient } from '../src';
import type { Message } from '../src';

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
            apiVersion: MessageAPIVersion.v1,
            data,
            key,
            id: 'idididid'
        }
    });

    mockMessageChannel.port2.onmessage(messageEvent);
};

const mockResponseFromChild = (key: string, data: any, requestId: string) => {
    const messageEvent = new MessageEvent<Message<any>>('message', {
        data: {
            type: MessageType.RESPONSE,
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

afterEach(() => {
    client.destroy();
});

const flushPromises = () => new Promise(setImmediate);

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

    expect(mockMessageChannel.port2.postMessage.mock.calls[0][0]).toMatchObject(
        {
            type: MessageType.CHANNEL_INIT,
            apiVersion: MessageAPIVersion.v1,
            key: '',
            data: childContext
        }
    );
});

test('Resolves requests to `getContext()` after receiving context from child client', async () => {
    client = new ChildClient<ParentContext>();

    mockInitMessageFromParent();

    const context = await client.getContext();

    expect(context).toEqual(parentContext);
});

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

test('Sends events to parent client after channel is established', async () => {
    client = new ChildClient<ParentContext>();

    client.send('event1', 'data1');
    expect(mockMessageChannel.port1.postMessage).not.toHaveBeenCalled();

    mockInitMessageFromParent();

    client.send('event2', 'data2');

    await flushPromises();

    expect(mockMessageChannel.port2.postMessage).toHaveBeenCalledTimes(3);

    expect(mockMessageChannel.port2.postMessage.mock.calls[1][0]).toMatchObject(
        {
            type: MessageType.EVENT,
            apiVersion: MessageAPIVersion.v1,
            key: 'event1',
            data: 'data1'
        }
    );

    expect(mockMessageChannel.port2.postMessage.mock.calls[2][0]).toMatchObject(
        {
            type: MessageType.EVENT,
            apiVersion: MessageAPIVersion.v1,
            key: 'event2',
            data: 'data2'
        }
    );
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

test('Resovles with data returned from handlers subscribed in the child client', async () => {
    client = new ChildClient<ParentContext>();

    mockInitMessageFromParent();

    await flushPromises();

    setTimeout(() => {
        const requestId =
            mockMessageChannel.port2.postMessage.mock.calls[1][0].id;
        mockResponseFromChild('request', 'responseData', requestId);
    }, 500);

    const response = await client.request('request', 'requestData');

    expect(response).toEqual('responseData');
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

    let rejected = false;

    await new Promise(resolve => {
        client.request('request', 'requestData').catch(() => {
            rejected = true;
            resolve();
        });
    });

    expect(rejected).toBe(true);
});

test('Closes message port on calls to `destroy()`', async () => {
    client = new ChildClient<ChildContext>();

    mockInitMessageFromParent();

    await flushPromises();

    client.destroy();

    expect(mockMessageChannel.port2.close).toHaveBeenCalled();
});
