import * as uiExtensionsSDK from '@datadog/ui-extensions-sdk';
import * as reactHooks from '@testing-library/react-hooks';

import { useCustomWidgetOptionString } from './use-custom-widget-option-string';

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

jest.mock('@datadog/ui-extensions-sdk', () => {
    return {
        ...jest.requireActual<object>('@datadog/ui-extensions-sdk'),
        DDClient: jest.fn(() => {
            return {
                events: {
                    on: jest.fn((): (() => void) => {
                        return jest.fn();
                    })
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
    jest.clearAllMocks();
});

describe('useCustomWidgetOptionString', (): void => {
    test('returns `undefined` if option is not set', (): void => {
        const client = new uiExtensionsSDK.DDClient();

        const result = reactHooks.renderHook(() => {
            return useCustomWidgetOptionString(client, 'option1');
        });

        expect(result.result.current).toBe(undefined);
    });

    test('returns `undefined` if option is not a string', async (): Promise<
        void
    > => {
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
                        option1: true
                    }
                }
            }
        };
        const client = new uiExtensionsSDK.DDClient();

        const result = reactHooks.renderHook(() => {
            return useCustomWidgetOptionString(client, 'option1');
        });
        await reactHooks.act(
            async (): Promise<void> => {
                deferredContext.resolve(context);
                await result.waitForNextUpdate();
            }
        );

        expect(result.result.current).toBe(undefined);
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
                        option1: 'hello'
                    }
                }
            }
        };
        const client = new uiExtensionsSDK.DDClient();

        const result = reactHooks.renderHook(() => {
            return useCustomWidgetOptionString(client, 'option1');
        });
        await reactHooks.act(
            async (): Promise<void> => {
                deferredContext.resolve(context);
                await result.waitForNextUpdate();
            }
        );

        expect(result.result.current).toEqual('hello');
    });
});
