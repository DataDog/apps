import * as uiExtensionsSDK from '@datadog/ui-extensions-sdk';
import * as React from 'react';

/**
 * This represents the different states the {@link uiExtensionsSDK.Context} can be in.
 */
type Context =
    | ContextHandshakeFailure
    | ContextInitialized
    | ContextInitializing;

/**
 * There was some kind of failure with the handshake.
 * There's no useful {@link uiExtensionsSDK.Context}, but there is an error.
 */
type ContextHandshakeFailure = { type: 'handshake failure'; error: unknown };

/**
 * The handshake is still being preformed.
 * There's no useful {@link uiExtensionsSDK.Context} yet.
 */
type ContextInitializing = { type: 'initializing' };

/**
 * The handshake has succeeded and there is a {@link uiExtensionsSDK.Context} that can be used.
 */
type ContextInitialized = {
    type: 'initialized';
    context: uiExtensionsSDK.Context;
};

/**
 * Returns a {@link Context} describing the state of the underlying {@link uiExtensionsSDK.Context}.
 * Will be updated whenever the {@link uiExtensionsSDK.Context} changes.
 *
 * This hook abstracts away the intricacies of keeping the {@link uiExtensionsSDK.Context} up to date.
 *
 * @param client An initialized {@link uiExtensionsSDK.DDClient}.
 * This should be the result of invoking {@link uiExtensionsSDK.init}.
 * @returns The state of the {@link uiExtensionsSDK.Context}.
 *
 * @example
 * This can be used like:
 * ```TypeScript
 * import * as uiExtensionsReact from '@datadog/ui-extensions-react';
 * import * as uiExtensionsSDK from '@datadog/ui-extensions-sdk';
 * import * as React from 'react';
 *
 * const client = uiExtensionsSDK.init();
 *
 * const Widget: React.FunctionComponent = () => {
 *      const result = uiExtensionsReact.useContext(client)
 *      if (result.type === 'initializing') {
 *          return <p>Initializing</p>;
 *      }
 *
 *      if (result.type === 'handshake failure') {
 *          return <p>Error</p>;
 *      }
 *
 *      const colorTheme: uiExtensionsSDK.ColorTheme = result.context.app.currentUser.colorTheme;
 *      return <p>Widget is ready! Color theme: {colorTheme}</p>;
 * }
 * ```
 */
function useContext(client: uiExtensionsSDK.DDClient): Context {
    const [context, setContext] = React.useState<Context>({
        type: 'initializing'
    });

    React.useEffect(() => {
        // Since we're dealing with promises,
        // we need some way to track whether or not to make a state change.
        // We keep track of whether or not we're still mounted.
        let unMounted: boolean = false;

        client
            .getContext()
            .then((newContext: uiExtensionsSDK.Context): void => {
                if (unMounted) {
                    return;
                }

                setContext({ type: 'initialized', context: newContext });
            })
            .catch((error: unknown): void => {
                if (unMounted) {
                    return;
                }

                setContext({ type: 'handshake failure', error });
            });

        const unsubscribeContextChange = client.events.on(
            uiExtensionsSDK.EventType.CONTEXT_CHANGE,
            (newContext: uiExtensionsSDK.Context): void => {
                setContext({ type: 'initialized', context: newContext });
            }
        );

        return () => {
            // We flip the flag to let any in-flight promises know we're unmounted.
            unMounted = true;
            unsubscribeContextChange();
        };
    }, [client]);

    return context;
}

export {
    Context,
    ContextHandshakeFailure,
    ContextInitialized,
    ContextInitializing,
    useContext
};
