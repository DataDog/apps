# FramePost

FramePost is a library for parent-child iframe communication. It is designed to handle the details of secure communication while also providing a user-friendly API that makes iframe communcation feel more like using an API. This works by establishing a `channel` between the parent and child through a mutual handshake process before any other logic may proceed.

## Parent Client

The parent client is responsible for initializing a channel with the child. When establishing a channel, the parent may include arbitrary data as `context` sent to the child during the handshake process. _This must be done after the iframe is fully loaded_. It is highly recommended that the channel be initialized in an `onload` event:

```
import { ParentClient } from '@datadog/framepost';

const client = new ParentClient();

const frame = document.createElement('iframe');

frame.src = 'https://domain.dom/path/to/frame.html';

const context = {
    infoAboutParent: 'it is a demo',
}

frame.onload = () => {
    client.requestChannel(frame, frame.src, context);
}
```

## Child Client

The child client must be initialized in the iframe during initial script execution. The child may provide context to be sent to the parent during the handshake process in the `context` config option.

```
import { ChildClient } from '@datadog/framepost';

const context = {
    infoAboutChild: 'It is a demo'
}

const client = new ChildClient({ context });
```

## Shared API

After the initial handshake succeeds, each client will handle communication with its counterpart using a shared API.

### `client.getContext()`:

Retrieves the context that the opposite client sent during the handshake process:

```
// in parent
const contextFromChild = await client.getContext();

// in child
const contextFromParent = await client.getContext();
```

### `client.on()`

The counterpart to `client.send()`. Subscribes an event handler that will execute on events of the specified type from the opposite client. Event keys must be unique. Returns an unsubscribe hook.

```
const unsubscribe = client.on('route_change', newRouteData => {
    ...
})

// later
unsubscribe();
```

### `client.send()`

The counterpart to `client.on()`. Sends an event to the opposite client with the specified event key and data. Event keys must be unique:

```
client.send('event_key', dataAboutEvent);
```

### `client.request()`:

The counterpart to `client.onRequest()`. A convenience method to send and receive data asynchronously from the opposite client. Designed to function like a promise-based api call. In order for a round-trip request to function correctly, an `onRequest` handler with a matching request key must be listening in the opposite client before the requeset is initiated. See below.

```
const data = await client.request('getMyData', requestParams);

```

### `client.onRequest()`:

The counterpart to `client.request()`. Receives request data send from a `client.request` call in the opposite client. Executes the provided handler, sending the returned response back to the opposite client.

```
client.onRequest('getMyData', async requestParams => {
    const responseData = await doSomeStuff());

    return responseData;
})
```

## Advanced

### Debug mode

Either client can be initialized in debug mode:

```
const parentClient = new ParentClient({ debug: true });
const childClient = new ChildClient({ debug: true });
```

This will print debug statements on various events and error cases.

### Profiling

Cool feature alert! FramePost will collect and report timing profiles of message transactions handled by each channel. To enable, pass `profile: true` to each client on init. Each client will silently collect data that can be requested in the parent with `parentClient.getProfile()`:

```
// in child
const childClient = new ChildClient({ proile: true });

// in parent
child parentClient = new ParentClient({ profile: true });

// after channel init and a few transactions:

parentClient.getMessageProfile().then(profile => {
    // do whatever you want with profile data
    console.log(profile);
});

```
