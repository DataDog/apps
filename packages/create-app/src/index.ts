#!/usr/bin/env node

import * as clipanion from 'clipanion';
import * as process from 'process';

import * as packageJSON from '../package.json';

import * as initialize from './initialize';

async function main(): Promise<void> {
    const [node, program, ...argv] = process.argv;

    const cli = new clipanion.Cli({
        binaryLabel: packageJSON.name,
        binaryName: `${node} ${program}`,
        binaryVersion: packageJSON.version,
        enableCapture: true
    });

    cli.register(clipanion.Builtins.HelpCommand);
    cli.register(clipanion.Builtins.VersionCommand);
    cli.register(initialize.Command);
    return cli.runExit(argv);
}

main().catch((error: Error): void => {
    console.error(error);
});

export {};
