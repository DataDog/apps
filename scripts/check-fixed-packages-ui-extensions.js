#!/usr/bin/env node
const getReleasePlan = require('@changesets/get-release-plan').default;

const packageInfo = require('./package-info');

/**
 * Checks that if any `@datadog/ui-extensions-*` package is getting a release,
 * all `@datadog/ui-extensions-*` packages are getting a release.
 *
 * While `changesets` does have support for "linked" packages:
 * https://github.com/changesets/changesets/blob/main/docs/linked-packages.md,
 * it's not exactly what we want.
 * The way "linked" packages work,
 * we can still leave out packages that we want to be on the same version.
 *
 * We do still want "linked" packages in our `.changeset/config.json`,
 * since it means we'll always get everything on the same version.
 * To that end,
 * this check doesn't need to actually look at specific version numbers.
 * We just have to catch packages that might be missed.
 *
 * The behavior we want is actually what's being proposed as "fixed" packages:
 * https://github.com/changesets/changesets/pull/690.
 * Until that feature is released,
 * we have this check to make sure we release packages in lock-step.
 */
async function main() {
    const errors = [];

    const releasePlan = await getReleasePlan('.');
    const releases = releasePlan.changesets.flatMap(changeset => {
        return changeset.releases;
    });
    const packageNames = releases.map(release => {
        return release.name;
    });
    const hasUIExtensionsPackages = packageNames.some(packageName => {
        return packageName.startsWith('@datadog/ui-extensions-');
    });

    if (!hasUIExtensionsPackages) {
        return;
    }

    const uiExtensionsPackages = packageInfo.getUIExtensionsPackages();
    for (const uiExtensionsPackage of uiExtensionsPackages) {
        if (packageNames.includes(uiExtensionsPackage.packageJSON.name)) {
            continue;
        }

        errors.push(
            `${uiExtensionsPackage.filename}: please use "yarn changeset add" to add a changeset for "${uiExtensionsPackage.packageJSON.name}".`
        );
    }

    packageInfo.handleErrors(errors);
}

main();
