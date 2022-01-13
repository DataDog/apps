import * as uiExtensionsSDK from '@datadog/ui-extensions-sdk';
import * as reactHooks from '@testing-library/react-hooks';

import { useContext } from './use-context';

/**
 * Lifted from `@datadog/ui-extensions-sdk/src/utils/testUtils`.
 */
export interface Deferred<Value> {
    promise: Promise<Value>;
    reject: (t: unknown) => void;
    resolve: (t: Value) => void;
}

/**
 * Lifted from `@datadog/ui-extensions-sdk/src/utils/testUtils`.
 */
export const defer = <Value>(): Deferred<Value> => {
    let reject: (error: unknown) => void = () => {};
    let resolve: (value: Value) => void = () => {};
    const promise = new Promise<Value>((res, rej) => {
        resolve = res;
        reject = rej;
    });

    return {
        promise,
        reject,
        resolve
    };
};

let deferredContext: Deferred<uiExtensionsSDK.Context>;
let handler: (eventData: unknown) => void;
const onUnsubscribe = jest.fn<void, never[]>();

jest.mock('@datadog/ui-extensions-sdk', () => {
    return {
        ...jest.requireActual<object>('@datadog/ui-extensions-sdk'),
        DDClient: jest.fn(() => {
            return {
                events: {
                    on: jest.fn(
                        (
                            eventType: uiExtensionsSDK.EventType,
                            callback: (eventData: unknown) => void
                        ): (() => void) => {
                            handler = callback;
                            return onUnsubscribe;
                        }
                    )
                },
                getContext: jest.fn(
                    (): Promise<uiExtensionsSDK.Context> => {
                        return deferredContext.promise;
                    }
                )
            };
        })
    };
});

beforeEach((): void => {
    deferredContext = defer();
    handler = (eventData: unknown): void => {};
    jest.clearAllMocks();
});

describe('useContext', (): void => {
    test('starts off in `initializing`', (): void => {
        const client = new uiExtensionsSDK.DDClient();

        const result = reactHooks.renderHook(() => {
            return useContext(client);
        });

        expect(result.result.current).toEqual({
            type: 'initializing'
        });
    });

    test('waits for the context to resolve', async (): Promise<void> => {
        const context: uiExtensionsSDK.Context = {
            app: {
                currentUser: {
                    colorTheme: uiExtensionsSDK.ColorTheme.light,
                    timeZone: ''
                },
                debug: false,
                features: []
            }
        };
        const client = new uiExtensionsSDK.DDClient();

        const result = reactHooks.renderHook(() => {
            return useContext(client);
        });
        await reactHooks.act(
            async (): Promise<void> => {
                deferredContext.resolve(context);
                await result.waitForNextUpdate();
            }
        );

        expect(result.result.current).toEqual({
            type: 'initialized',
            context
        });
    });

    test('handles handshake failures', async (): Promise<void> => {
        const error: Error = new Error('Handshake failure');
        const client = new uiExtensionsSDK.DDClient();

        const result = reactHooks.renderHook(() => {
            return useContext(client);
        });
        await reactHooks.act(
            async (): Promise<void> => {
                deferredContext.reject(error);
                await result.waitForNextUpdate();
            }
        );

        expect(result.result.current).toEqual({
            type: 'handshake failure',
            error
        });
    });

    test('updates from `CONTEXT_CHANGE` event', async (): Promise<void> => {
        const context: uiExtensionsSDK.Context = {
            app: {
                currentUser: {
                    colorTheme: uiExtensionsSDK.ColorTheme.light,
                    timeZone: ''
                },
                debug: false,
                features: []
            }
        };
        const client = new uiExtensionsSDK.DDClient();

        const result = reactHooks.renderHook(() => {
            return useContext(client);
        });
        await reactHooks.act(
            async (): Promise<void> => {
                handler(context);
                await result.waitForNextUpdate();
            }
        );

        expect(result.result.current).toEqual({
            type: 'initialized',
            context
        });
    });

    test('invokes unsubscribe callback when unmounting', (): void => {
        const client = new uiExtensionsSDK.DDClient();

        const result = reactHooks.renderHook(() => {
            return useContext(client);
        });

        expect(onUnsubscribe).not.toHaveBeenCalled();

        result.unmount();

        expect(onUnsubscribe).toHaveBeenCalledTimes(1);
    });
});
