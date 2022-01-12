#!/usr/bin/env node
const child_process = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

function getPackageJSONInfo(filename) {
    const buffer = fs.readFileSync(filename);
    const packageJSON = JSON.parse(buffer.toString());
    return {
        filename,
        packageJSON
    };
}

function getExamples() {
    const packageJSONPattern = path.join('examples', '*', 'package.json');

    return getPackages(packageJSONPattern);
}

function getPackages(packageJSONPattern) {
    const gitLSFiles = child_process.execSync(
        `git ls-files '${packageJSONPattern}'`
    );
    const packageJSONFilenames = gitLSFiles.toString().trim().split(os.EOL);
    const packageJSONs = [];

    for (const filename of packageJSONFilenames) {
        const packageJSONInfo = getPackageJSONInfo(filename);
        packageJSONs.push(packageJSONInfo);
    }

    return packageJSONs;
}

function getUIExtensionsPackages() {
    const packageJSONPattern = path.join(
        'packages',
        'ui-extensions-*',
        'package.json'
    );

    return getPackages(packageJSONPattern);
}

function getUIExtensionsSDK() {
    return getPackageJSONInfo('packages/ui-extensions-sdk/package.json');
}

function handleErrors(errors) {
    if (errors.length > 0) {
        const message = ['Please fix the following packages:', ...errors].join(
            `${os.EOL}    `
        );
        console.error(message);
        process.exit(1);
    }
}

module.exports = {
    getExamples,
    getUIExtensionsPackages,
    getUIExtensionsSDK,
    handleErrors
};
