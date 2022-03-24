import * as uiExtensionsSDK from '@datadog/ui-extensions-sdk';

import { useCustomWidgetOption } from './use-custom-widget-option';

/**
 * Returns the current value of a single custom widget option that is expected to be a {@link boolean}.
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
 *     const verbose = uiExtensionsReact.useCustomWidgetOptionBoolean(client, 'verbose');
 *
 *     if (verbose == null) {
 *         return <p>Please decide on verbosity</p>;
 *     } else {
 *         return <p>Verbose: {verbose}</p>;
 *     }
 * }
 * ```
 */
function useCustomWidgetOptionBoolean(
    client: uiExtensionsSDK.DDClient,
    optionName: string
): boolean | undefined {
    const option: boolean | undefined = useCustomWidgetOption(
        client,
        optionName,
        (newOption: string | boolean): boolean | undefined => {
            if (typeof newOption !== 'boolean') {
                return;
            }

            return newOption;
        }
    );

    return option;
}

export { useCustomWidgetOptionBoolean };
