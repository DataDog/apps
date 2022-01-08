import * as clipanion from 'clipanion';
import * as fs from 'fs';
import * as got from 'got';
import * as pkgInstall from 'pkg-install';
import * as stream from 'stream';
import * as tar from 'tar';
import * as util from 'util';

const pipeline = util.promisify(stream.Stream.pipeline);

const defaultBranch = 'master';
const defaultDirectoryName = 'starter-kit';
const defaultExample = 'starter-kit';

/**
 * Helper to make logging just a bit easier.
 *
 * We might consider pulling in an actual logger if need be.
 */
function makeLogger(verbose: boolean): typeof console.log {
    if (!verbose) {
        return (): void => {};
    }

    return console.log;
}

/**
 * The {@link clipanion.Command} for initializing.
 *
 * Will create the appropriate directory, download the example, and install any dependencies.
 */
export class Command extends clipanion.Command {
    /**
     * We want this {@link clipanion.Command} to be the default so it's enough to say `npm init @datadog/app`.
     */
    static paths = [clipanion.Command.Default];

    /**
     * This option is useful for testing different commits (or branches).
     * It's unlikely to be useful to an App developer, however.
     */
    commit = clipanion.Option.String('--commit', defaultBranch, {
        description: `The commit to download from. Defaults to the \`${defaultBranch}\` branch, if not supplied`
    });

    /**
     * This option allows App developers to name the directory what they'd prefer.
     */
    directory = clipanion.Option.String('--directory', defaultDirectoryName, {
        description: `The directory to initialize. Defaults to \`${defaultDirectoryName}\`, if not supplied`
    });

    /**
     * This option allows App developers to select an example to initialize with.
     */
    example = clipanion.Option.String('--example', defaultExample, {
        description: `The example to initialize. Defaults to the \`${defaultExample}\`, if not supplied`
    });

    /**
     * This option is useful for debugging purposes.
     */
    verbose = clipanion.Option.Boolean('--verbose', false, {
        description: 'Print out debugging information'
    });

    /**
     * The actual {@link clipanion.Command} logic.
     */
    async execute(): Promise<void> {
        const logDebug = makeLogger(this.verbose);
        const logInfo = makeLogger(true);

        logDebug({
            options: {
                commit: this.commit,
                example: this.example,
                directory: this.directory,
                verbose: this.verbose
            }
        });

        logInfo(`Creating ${this.directory} directory`);
        await fs.promises.mkdir(this.directory, { recursive: true });
        logDebug(`Created ${this.directory} directory`);

        logInfo(`Downloading ${this.example} example…`);
        await pipeline(
            got.default.stream(
                `https://github.com/DataDog/apps/archive/${this.commit}.tar.gz`
            ),
            tar.extract({ cwd: this.directory, stripComponents: 3 }, [
                `apps-${this.commit}/examples/${this.example}`
            ])
        );
        logDebug(`Downloaded ${this.example} example`);

        logInfo('Installing dependencies…');
        const installResult = await pkgInstall.projectInstall({
            cwd: this.directory,
            stdio: 'inherit'
        });
        if (installResult.code !== 0) {
            logDebug('Error installing dependencies', { installResult });
            return Promise.reject(new Error(installResult.stderr));
        }
        logDebug('Installed dependencies', { installResult });

        logInfo('');
        logInfo("You're all setup and ready to go!");
        logInfo(
            'Visit https://docs.datadoghq.com/developers/datadog_apps for documentation.'
        );
    }
}