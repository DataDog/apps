import * as uiExtensionsSDK from '@datadog/ui-extensions-sdk';

import { useCustomWidgetOption } from './use-custom-widget-option';

/**
 * Returns the current value of a single custom widget option that is expected to be a {@link string}.
 * This will be updated whenever the options change.
 *
 * This hook abstracts away the intricacies of keeping up to date with an option.
 *
 * @param client An initialized {@link uiExtensionsSDK.DDClient}. This should be the result of invoking {@link uiExtensionsSDK.init}.
 * @param optionName The option name to look for.
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
 * const CustomWidget: React.FunctionComponent = () => {
 *     const query = uiExtensionsReact.useCustomWidgetOptionString(client, 'query');
 *
 *     if (query == null) {
 *         return <p>Please set a query</p>;
 *     } else {
 *         return <p>Query: {query}</p>;
 *     }
 * }
 * ```
 */
function useCustomWidgetOptionString(
    client: uiExtensionsSDK.DDClient,
    optionName: string
): string | undefined {
    const option: string | undefined = useCustomWidgetOption(
        client,
        optionName,
        (newOption: string | boolean): string | undefined => {
            if (typeof newOption !== 'string') {
                return;
            }

            return newOption;
        }
    );

    return option;
}

export { useCustomWidgetOptionString };
