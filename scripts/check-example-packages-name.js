#!/usr/bin/env node
const path = require('path');

const packageInfo = require('./package-info');

const expectedPrefix = 'datadog-app-example-';

/**
 * Parses the path part of the filename and into what we expect.
 *
 * Given a filename like `'examples/path/to/package/package.json'`,
 * will produce a parsed name like `'datadog-app-example-path-to-package'`.
 * @param {string} filename should be of the form `'examples/path/to/package/package.json'`
 * @returns string
 */
function parseExpectedName(filename) {
    // Each filename should be of the form `'examples/path/to/package/package.json'`
    const allParts = filename.split(path.sep);
    // We want to drop the `examples` and `package.json` from the start and end, respectively.
    // We'll end up with `['path', 'to', 'package']`
    const parts = allParts.slice(1, -1);
    // Join it all together with the prefix.
    // We'll end up with something like `'datadog-app-example-path-to-package'`
    return `${expectedPrefix}${parts.join('-')}`;
}

/**
 * Checks each example package has the expected name.
 *
 * The particular naming scheme is not important.
 * What's important is that we're consistent with the names we make.
 */
function main() {
    const errors = [];

    for (const info of packageInfo.getExamples()) {
        const actualName = info.packageJSON.name;
        const expectedName = parseExpectedName(info.filename);
        if (actualName !== expectedName) {
            errors.push(
                `${info.filename}: the "name" field should be "${expectedName}".`
            );
        }
    }

    packageInfo.handleErrors(errors);
}

main();
