#!/usr/bin/env node
const packageInfo = require('./package-info');

/**
 * Checks each example package has a version field.
 *
 * Though this field isn't technically required for examples,
 * some of our tooling expects it to be there and acts strangely if it's not.
 */
function main() {
    const errors = [];

    for (const info of packageInfo.getExamples()) {
        const version = info.packageJSON.version;
        if (version == null) {
            errors.push(`${info.filename}: please add a "version" field.`);
        }
    }

    packageInfo.handleErrors(errors);
}

main();
