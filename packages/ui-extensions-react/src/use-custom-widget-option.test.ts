import * as uiExtensionsSDK from '@datadog/ui-extensions-sdk';
import * as reactHooks from '@testing-library/react-hooks';

import { useCustomWidgetOption } from './use-custom-widget-option';

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

describe('useCustomWidgetOption', (): void => {
    test('defaults to `undefined` if option is not set', (): void => {
        const client = new uiExtensionsSDK.DDClient();

        const result = reactHooks.renderHook(() => {
            return useCustomWidgetOption(client, 'option1', option => option);
        });

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
                        option1: true,
                        option2: 'hello'
                    }
                }
            }
        };
        const client = new uiExtensionsSDK.DDClient();

        const result = reactHooks.renderHook(() => {
            return useCustomWidgetOption(client, 'option1', option => option);
        });
        await reactHooks.act(
            async (): Promise<void> => {
                deferredContext.resolve(context);
                await result.waitForNextUpdate();
            }
        );

        expect(result.result.current).toEqual(true);
    });
});
