import { AuthState, EventType, init } from '.';

/**
 * `AssertEqual<Actual, Expected>` checks that `Actual` is a subtype of `Expected`,
 * and that `Expected` is a subtype of `Actual`.
 * If both are true,
 * then both the types are the same.
 *
 * If either one is not true,
 * we provide an explanation of the reason (along with the types for introspection).
 */
type AssertEqual<Actual, Expected> = Actual extends Expected
    ? Expected extends Actual
        ? true
        : {
              error: 'expected type was too restrictive';
              actual: Actual;
              expected: Expected;
          }
    : {
          error: 'actual type was incorrect';
          actual: Actual;
          expected: Expected;
      };

describe('init()', () => {
    describe('type assertions', () => {
        // The following tests don't actually need to run.
        // All we care about is that the `AuthStateArgs` can be inferred correctly.
        // If it doesn't infer properly,
        // the `AssertEqual<Actual, Expected>` type will fail to type check.
        test('infers `unknown` if no `authProvider` is given', () => {
            const client = init();

            client.events.on(EventType.AUTH_STATE_CHANGE, authState => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const assertion: AssertEqual<
                    typeof authState,
                    AuthState<unknown>
                > = true;
            });
        });

        test('infers `unknown` if `authStateCallback` does not return `args`', () => {
            const client = init({
                authProvider: {
                    authStateCallback: () => {
                        return {
                            isAuthenticated: false
                        };
                    },
                    url: ''
                }
            });

            client.events.on(EventType.AUTH_STATE_CHANGE, authState => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const assertion: AssertEqual<
                    typeof authState,
                    AuthState<unknown>
                > = true;
            });
        });

        test('propagates the `AuthStateArgs` to `AUTH_STATE_CHANGE` events', () => {
            const client = init({
                authProvider: {
                    authStateCallback: () => {
                        return {
                            args: {
                                foo: '',
                                bar: false
                            },
                            isAuthenticated: false
                        };
                    },
                    url: ''
                }
            });

            client.events.on(EventType.AUTH_STATE_CHANGE, authState => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const assertion: AssertEqual<
                    typeof authState,
                    AuthState<{ foo: string; bar: boolean }>
                > = true;
            });
        });
    });
});
