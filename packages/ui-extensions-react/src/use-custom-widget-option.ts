import * as uiExtensionsSDK from '@datadog/ui-extensions-sdk';
import * as React from 'react';

import * as useContext from './use-context';

/**
 * Returns the current value of a single custom widget option.
 * This will be updated whenever the options change.
 *
 * This hook abstracts away the intricacies of keeping options up to date.
 *
 * @param client An initialized {@link uiExtensionsSDK.DDClient}. This should be the result of invoking {@link uiExtensionsSDK.init}.
 * @param optionName The option name to look for.
 * @param parser A function for parsing the option value.
 * @returns The option value (if it exists).
 *
 * @example
 * This hook can be used like:
 * ```TypeScript
 * import * as uiExtensionsReact from '@datadog/ui-extensions-react';
 * import * as uiExtensionsSDK from '@datadog/ui-extensions-sdk';
 * import * as React from 'react';
 *
 * const client = uiExtensionsSDK.init();
 *
 * const parseInt = (option: string | boolean): number | undefined => {
 *     if (typeof option !== 'string') {
 *         return;
 *     }
 *
 *     const parsed: number = Number.parseInt(option);
 *     if (Number.isNaN(parsed)) {
 *         return;
 *     }
 *
 *     return parsed;
 * };
 *
 * const CustomWidget: React.FunctionComponent = () => {
 *     const threshold = uiExtensionsReact.useCustomWidgetOption(client, 'threshold', parseInt);
 *
 *     if (threshold == null) {
 *         return <p>Please set a threshold</p>;
 *     } else {
 *         return <p>Threshold: {threshold}</p>;
 *     }
 * }
 * ```
 */
function useCustomWidgetOption<Result>(
    client: uiExtensionsSDK.DDClient,
    optionName: string,
    parser: (option: string | boolean) => Result | undefined
): Result | undefined {
    const context = useContext.useContext(client);
    const [option, setOption] = React.useState<Result>();

    React.useEffect(() => {
        if (context == null) {
            return;
        }

        const initialOption: string | boolean | undefined =
            context.widget?.definition.options?.[optionName];
        if (initialOption == null) {
            setOption(undefined);
            return;
        }

        const parsed = parser(initialOption);
        setOption(parsed);
    }, [context, context?.widget?.definition.options, optionName, parser]);

    return option;
}

export { useCustomWidgetOption };
