import * as uiExtensionsSDK from '@datadog/ui-extensions-sdk';
import * as React from 'react';

import * as useContext from './use-context';

/**
 * Returns the current value of a specific template variable.
 * This will be updated whenever the template variable change.
 *
 * This hook abstracts away the intricacies of keeping template variables up to date.
 *
 * @param client An initialized {@link uiExtensionsSDK.DDClient}. This should be the result of invoking {@link uiExtensionsSDK.init}.
 * @param variableName The name of the template variable to get the value of.
 * @returns The value of the template variable if it exists.
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
 *     const service = uiExtensionsReact.useTemplateVariable(client, 'service');
 *
 *     if (service == null) {
 *         return <p>Please select a service from the template variables.</p>;
 *     }
 *
 *     return <p>Service: {service}.</p>;
 * }
 * ```
 */
function useTemplateVariable(
    client: uiExtensionsSDK.DDClient,
    variableName: string
): string | undefined {
    const context = useContext.useContext(client);

    const variable = React.useMemo(() => {
        const templateVariable = context?.dashboard?.templateVars.find(
            (value: uiExtensionsSDK.TemplateVariableValue): boolean => {
                return value.name === variableName;
            }
        );

        return templateVariable?.value;
    }, [context?.dashboard?.templateVars, variableName]);

    return variable;
}

export { useTemplateVariable };
