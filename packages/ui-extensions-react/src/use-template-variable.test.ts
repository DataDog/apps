import * as uiExtensionsSDK from '@datadog/ui-extensions-sdk';
import * as reactHooks from '@testing-library/react-hooks';

import { useTemplateVariable } from './use-template-variable';

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
const handlerContextChange = jest.fn<void, unknown[]>();
const handlerDashboardTemplateVarChange = jest.fn<void, unknown[]>();

const makeContext = (
    templateVars: uiExtensionsSDK.TemplateVariableValue[]
): uiExtensionsSDK.Context => {
    return {
        app: {
            currentUser: {
                colorTheme: uiExtensionsSDK.ColorTheme.light,
                timeZone: ''
            },
            debug: false,
            features: []
        },
        dashboard: {
            id: '',
            shareURL: '',
            templateVars,
            timeframe: {
                end: 0,
                isLive: false,
                start: 0
            }
        }
    };
};

const onUnsubscribeContextChange = jest.fn<void, never[]>();
const onUnsubscribeDashboardTemplateVarChange = jest.fn<void, never[]>();

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
                            switch (eventType) {
                                case uiExtensionsSDK.EventType.CONTEXT_CHANGE:
                                    handlerContextChange.mockImplementation(
                                        callback
                                    );
                                    return onUnsubscribeContextChange;

                                case uiExtensionsSDK.EventType
                                    .DASHBOARD_TEMPLATE_VAR_CHANGE:
                                    handlerDashboardTemplateVarChange.mockImplementation(
                                        callback
                                    );
                                    return onUnsubscribeDashboardTemplateVarChange;

                                default:
                                    return () => {};
                            }
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
    jest.clearAllMocks();
});

describe('useTemplateVariable', (): void => {
    test('returns `undefined` if the variable is not set', (): void => {
        const client = new uiExtensionsSDK.DDClient();

        const result = reactHooks.renderHook(() => {
            return useTemplateVariable(client, 'variable1');
        });

        expect(result.result.current).toEqual(undefined);
    });

    test('returns the value from the initial context', async (): Promise<
        void
    > => {
        const context: uiExtensionsSDK.Context = makeContext([
            {
                name: 'variable1',
                value: 'value1'
            }
        ]);
        const client = new uiExtensionsSDK.DDClient();

        const result = reactHooks.renderHook(() => {
            return useTemplateVariable(client, 'variable1');
        });
        await reactHooks.act(
            async (): Promise<void> => {
                deferredContext.resolve(context);
                await result.waitForNextUpdate();
            }
        );

        expect(result.result.current).toEqual('value1');
    });

    describe('for the `CONTEXT_CHANGE` event', (): void => {
        test('updates from the event', async (): Promise<void> => {
            const client = new uiExtensionsSDK.DDClient();
            const context: uiExtensionsSDK.Context = makeContext([
                {
                    name: 'variable1',
                    value: 'value1'
                }
            ]);

            const result = reactHooks.renderHook(() => {
                return useTemplateVariable(client, 'variable1');
            });
            await reactHooks.act(
                async (): Promise<void> => {
                    handlerContextChange(context);
                    await result.waitForNextUpdate();
                }
            );

            expect(result.result.current).toEqual('value1');
        });

        test('uses latest value from the event', async (): Promise<void> => {
            const client = new uiExtensionsSDK.DDClient();
            const context1: uiExtensionsSDK.Context = makeContext([
                {
                    name: 'variable1',
                    value: 'value1'
                }
            ]);
            const context2: uiExtensionsSDK.Context = makeContext([
                {
                    name: 'variable1',
                    value: 'value2'
                }
            ]);

            const result = reactHooks.renderHook(() => {
                return useTemplateVariable(client, 'variable1');
            });
            await reactHooks.act(
                async (): Promise<void> => {
                    handlerContextChange(context1);
                    await result.waitForNextUpdate();
                }
            );
            await reactHooks.act(
                async (): Promise<void> => {
                    handlerContextChange(context2);
                    await result.waitForNextUpdate();
                }
            );

            expect(result.result.current).toEqual('value2');
        });

        test('invokes unsubscribe callback when unmounting', (): void => {
            const client = new uiExtensionsSDK.DDClient();

            const result = reactHooks.renderHook(() => {
                return useTemplateVariable(client, 'variable1');
            });

            expect(onUnsubscribeContextChange).not.toHaveBeenCalled();

            result.unmount();

            expect(onUnsubscribeContextChange).toHaveBeenCalledTimes(1);
        });
    });

    describe('for the `DASHBOARD_TEMPLATE_VAR_CHANGE` event', (): void => {
        test('updates from the event', async (): Promise<void> => {
            const client = new uiExtensionsSDK.DDClient();
            const context: uiExtensionsSDK.Context = makeContext([
                {
                    name: 'variable1',
                    value: 'value1'
                }
            ]);

            const result = reactHooks.renderHook(() => {
                return useTemplateVariable(client, 'variable1');
            });
            await reactHooks.act(
                async (): Promise<void> => {
                    handlerContextChange(context);
                    await result.waitForNextUpdate();
                }
            );

            expect(result.result.current).toEqual('value1');
        });
    });
});
