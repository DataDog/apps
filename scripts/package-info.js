#!/usr/bin/env node
const child_process = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const exampleDir = 'examples';
const packageJSONPattern = path.join(exampleDir, '*', 'package.json');

function getExamples() {
    const gitLSFiles = child_process.execSync(
        `git ls-files '${packageJSONPattern}'`
    );
    const packageJSONFilenames = gitLSFiles.toString().trim().split(os.EOL);
    const packageJSONs = [];

    for (const filename of packageJSONFilenames) {
        const buffer = fs.readFileSync(filename);
        const packageJSON = JSON.parse(buffer.toString());
        packageJSONs.push({ filename, packageJSON });
    }

    return packageJSONs;
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
    handleErrors
};
