import * as uiExtensionsSDK from '@datadog/ui-extensions-sdk';
import * as reactHooks from '@testing-library/react-hooks';

import { useCustomWidgetOptions } from './use-custom-widget-options';

/**
 * Lifted from `@datadog/ui-extensions-sdk/src/utils/testUtils`.
 */
interface Deferred<Value> {
    promise: Promise<Value>;
    reject: (t: unknown) => void;
    resolve: (t: Value) => void;
}

/**
 * Lifted from `@datadog/ui-extensions-sdk/src/utils/testUtils`.
 */
const defer = <Value>(): Deferred<Value> => {
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
                            if (
                                eventType !==
                                uiExtensionsSDK.EventType
                                    .DASHBOARD_CUSTOM_WIDGET_OPTIONS_CHANGE
                            ) {
                                return () => {};
                            }

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

describe('useCustomWidgetOptions', (): void => {
    test('defaults initialOptions to `{}` if not given', (): void => {
        const client = new uiExtensionsSDK.DDClient();

        const result = reactHooks.renderHook(() => {
            return useCustomWidgetOptions(client);
        });

        expect(result.result.current).toEqual({});
    });

    test('sets the initialOptions given', (): void => {
        const client = new uiExtensionsSDK.DDClient();

        const result = reactHooks.renderHook(() => {
            return useCustomWidgetOptions(client, {
                option1: true,
                option2: 'hello',
                option3: false,
                option4: ''
            });
        });

        expect(result.result.current).toEqual({
            option1: true,
            option2: 'hello',
            option3: false,
            option4: ''
        });
    });

    test('updates with data from the context', async (): Promise<void> => {
        const context: uiExtensionsSDK.Context = {
            app: {
                currentUser: {
                    colorTheme: uiExtensionsSDK.ColorTheme.light,
                    timeZone: ''
                },
                debug: false,
                features: []
            },
            widget: {
                definition: {
                    custom_widget_key: 'key',
                    options: {
                        option1: true,
                        option2: 'hello'
                    }
                }
            }
        };
        const client = new uiExtensionsSDK.DDClient();

        const result = reactHooks.renderHook(() => {
            return useCustomWidgetOptions(client);
        });
        await reactHooks.act(
            async (): Promise<void> => {
                deferredContext.resolve(context);
                await result.waitForNextUpdate();
            }
        );

        expect(result.result.current).toEqual({
            option1: true,
            option2: 'hello'
        });
    });

    test('updates from the `DASHBOARD_CUSTOM_WIDGET_OPTIONS_CHANGE` event', async (): Promise<
        void
    > => {
        const client = new uiExtensionsSDK.DDClient();

        const result = reactHooks.renderHook(() => {
            return useCustomWidgetOptions(client);
        });
        await reactHooks.act(
            async (): Promise<void> => {
                handler({ option1: true, option2: 'hello' });
                await result.waitForNextUpdate();
            }
        );

        expect(result.result.current).toEqual({
            option1: true,
            option2: 'hello'
        });
    });

    test('replaces initialOptions with the `DASHBOARD_CUSTOM_WIDGET_OPTIONS_CHANGE` event', async (): Promise<
        void
    > => {
        const client = new uiExtensionsSDK.DDClient();

        const result = reactHooks.renderHook(() => {
            return useCustomWidgetOptions(client, { option1: false });
        });
        await reactHooks.act(
            async (): Promise<void> => {
                handler({ option1: true, option2: 'hello' });
                await result.waitForNextUpdate();
            }
        );

        expect(result.result.current).toEqual({
            option1: true,
            option2: 'hello'
        });
    });

    test('uses latest options from the `DASHBOARD_CUSTOM_WIDGET_OPTIONS_CHANGE` event', async (): Promise<
        void
    > => {
        const client = new uiExtensionsSDK.DDClient();

        const result = reactHooks.renderHook(() => {
            return useCustomWidgetOptions(client);
        });
        await reactHooks.act(
            async (): Promise<void> => {
                handler({ option1: true });
                await result.waitForNextUpdate();
            }
        );
        await reactHooks.act(
            async (): Promise<void> => {
                handler({ option1: false });
                await result.waitForNextUpdate();
            }
        );

        expect(result.result.current).toEqual({
            option1: false
        });
    });

    test('invokes unsubscribe callback when unmounting', (): void => {
        const client = new uiExtensionsSDK.DDClient();

        const result = reactHooks.renderHook(() => {
            return useCustomWidgetOptions(client);
        });

        expect(onUnsubscribe).not.toHaveBeenCalled();

        result.unmount();

        expect(onUnsubscribe).toHaveBeenCalledTimes(1);
    });
});
