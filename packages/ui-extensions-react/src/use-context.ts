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
 * Returns a {@link uiExtensionsSDK.Context}.
 * Will be updated whenever the {@link uiExtensionsSDK.Context} changes.
 *
 * This hook abstracts away the intricacies of keeping the {@link uiExtensionsSDK.Context} up to date.
 *
 * @param client An initialized {@link uiExtensionsSDK.DDClient}.
 * This should be the result of invoking {@link uiExtensionsSDK.init}.
 * @returns The {@link uiExtensionsSDK.Context}, if it exists.
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
 *      const context = uiExtensionsReact.useContext(client)
 *      if (context == null) {
 *          return <p>Initializing</p>;
 *      }
 *
 *      const colorTheme: uiExtensionsSDK.ColorTheme = context.app.currentUser.colorTheme;
 *      return <p>Widget is ready! Color theme: {colorTheme}</p>;
 * }
 * ```
 */
function useContext(
    client: uiExtensionsSDK.DDClient
): uiExtensionsSDK.Context | undefined {
    const result = useContextImplementation(client);
    switch (result.type) {
        case 'handshake failure':
            return undefined;

        case 'initialized':
            return result.context;

        case 'initializing':
            return undefined;
    }
}

/**
 * The low-level implementation of the {@link useContext} hook.
 * This only exists to make it a bit clearer to understand how we deal with the different states.
 *
 * @param client An initialized {@link uiExtensionsSDK.DDClient}.
 * This should be the result of invoking {@link uiExtensionsSDK.init}.
 * @returns The state of the {@link uiExtensionsSDK.Context}.
 */
function useContextImplementation(client: uiExtensionsSDK.DDClient): Context {
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

export { useContext };
