#!/usr/bin/env node
const packageInfo = require('./package-info');

/**
 * Checks each example package that has a dependency on `@datadog/ui-extensions-sdk` has the latest version.
 *
 * Keeping these all on the latest version ensures we catch any breaking changes sooner rather than later.
 */
function main() {
    const errors = [];
    const packageName = '@datadog/ui-extensions-sdk';

    const uiExtensionsSDK = packageInfo.getUIExtensionsSDK();
    const uiExtensionsSDKVersion = uiExtensionsSDK.packageJSON.version;
    for (const info of packageInfo.getExamples()) {
        const devDependenciesVersion =
            info.packageJSON.devDependencies?.[packageName];
        if (devDependenciesVersion != null) {
            if (devDependenciesVersion !== uiExtensionsSDKVersion) {
                errors.push(
                    `${info.filename}: please update "${packageName}" in "devDependencies" to "${uiExtensionsSDKVersion}".`
                );
            }
        }

        const dependenciesVersion =
            info.packageJSON.dependencies?.[packageName];
        if (dependenciesVersion != null) {
            if (dependenciesVersion !== uiExtensionsSDKVersion) {
                errors.push(
                    `${info.filename}: please update "${packageName}" in "dependencies" to "${uiExtensionsSDKVersion}".`
                );
            }
        }
    }

    packageInfo.handleErrors(errors);
}

main();
