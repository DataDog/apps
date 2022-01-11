#!/usr/bin/env node
const packageInfo = require('./package-info');

/**
 * Checks each example package is private.
 *
 * We don't want to accidentally publish one of these packages.
 */
function main() {
    const errors = [];

    for (const info of packageInfo.getExamples()) {
        const private = info.packageJSON.private;
        if (private == null) {
            errors.push(
                `${info.filename}: please add a "private" field with a value of true.`
            );
        }

        if (private === false) {
            errors.push(
                `${info.filename}: please make the "private" field true.`
            );
        }
    }

    packageInfo.handleErrors(errors);
}

main();
