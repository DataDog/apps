import * as uiExtensionsSDK from '@datadog/ui-extensions-sdk';
import * as React from 'react';

import * as useContext from './use-context';

/**
 * Returns the current value of custom widget options.
 * This will be updated whenever the options change.
 *
 * This hook abstracts away the intricacies of keeping options up to date.
 *
 * @param client An initialized {@link uiExtensionsSDK.DDClient}. This should be the result of invoking {@link uiExtensionsSDK.init}.
 * @param initialOptions Any initial custom widget options. These are only used until a value is set in the option.
 * @returns The updated custom widget options.
 *
 * @example
 * This hook can be used like:
 * ```TypeScript
 * import * as uiExtensionsReact from '@datadog/ui-extensions-react';
 * import * as uiExtensionsSDK from '@datadog/ui-extensions-sdk';
 * import * as React from 'react';
 *
 * type Options = {
 *     option1: string;
 *     option2: boolean;
 * };
 *
 * const client = uiExtensionsSDK.init();
 *
 * const CustomWidget: React.FunctionComponent = () => {
 *     const options = uiExtensionsReact.useCustomWidgetOptions<Options>(client);
 *
 *     if (options.option2 === true) {
 *         return <p>Option 2 was set!</p>;
 *     } else {
 *         return <p>Option 2 was not set.</p>;
 *     }
 * }
 * ```
 */
function useCustomWidgetOptions<
    Options extends Record<string, string | boolean>
>(
    client: uiExtensionsSDK.DDClient,
    initialOptions?: Partial<Options>
): Partial<Options> {
    const context = useContext.useContext(client);
    const [options, setOptions] = React.useState(initialOptions ?? {});

    React.useEffect(() => {
        if (context?.widget?.definition.options == null) {
            return;
        }

        setOptions(context.widget.definition.options);
    }, [context?.widget?.definition.options]);

    React.useEffect(() => {
        const unsubscribeOptionsChange = client.events.on(
            uiExtensionsSDK.EventType.DASHBOARD_CUSTOM_WIDGET_OPTIONS_CHANGE,
            setOptions
        );

        return () => {
            unsubscribeOptionsChange();
        };
    }, [client.events]);

    return options;
}

export { useCustomWidgetOptions };
