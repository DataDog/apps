import * as uiExtensionsSDK from '@datadog/ui-extensions-sdk';
import * as React from 'react';

import * as useContext from './use-context';

function findTemplateVariableValue(
    variableName: string,
    templateVariables: uiExtensionsSDK.TemplateVariableValue[]
): string | undefined {
    const templateVariable = templateVariables.find(
        (value: uiExtensionsSDK.TemplateVariableValue): boolean => {
            return value.name === variableName;
        }
    );

    if (templateVariable?.value == null) {
        return;
    }

    return templateVariable.value;
}

/**
 * Returns the current value of a specific template variable.
 * This will be updated whenever the template variable changes.
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
    const [variable, setVariable] = React.useState<string | undefined>();

    React.useEffect(() => {
        const templateVariables = context?.dashboard?.templateVars ?? [];
        const value = findTemplateVariableValue(
            variableName,
            templateVariables
        );
        if (value == null) {
            return;
        }

        setVariable(value);
    }, [context?.dashboard?.templateVars, variableName]);

    React.useEffect(() => {
        const unsubscribe = client.events.on(
            uiExtensionsSDK.EventType.DASHBOARD_TEMPLATE_VAR_CHANGE,
            (
                templateVariables: uiExtensionsSDK.TemplateVariableValue[]
            ): void => {
                const value = findTemplateVariableValue(
                    variableName,
                    templateVariables
                );
                if (value == null) {
                    return;
                }

                setVariable(value);
            }
        );

        return () => {
            unsubscribe();
        };
    }, [client.events, variableName]);

    return variable;
}

export { useTemplateVariable };
