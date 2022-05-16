import * as clipanion from 'clipanion';
import * as fs from 'fs';
import * as got from 'got';
import * as handlebars from 'handlebars';
import * as path from 'path';
import * as pkgInstall from 'pkg-install';
import * as stream from 'stream';
import * as tar from 'tar';
import * as typanion from 'typanion';
import * as util from 'util';

const pipeline = util.promisify(stream.Stream.pipeline);

/**
 * The configuration needed to initialize the correct features.
 */
type FeaturesConfig = {
    customWidget: boolean;
    dashboardCogMenu: boolean;
    modal: boolean;
    sidePanel: boolean;
};

const defaultBranch = 'master';
const defaultExample = 'starter-kit';

const features = [
    'custom-widget',
    'dashboard-cog-menu',
    'modal',
    'side-panel'
] as const;

const templateDirectory: string = path.join(__dirname, 'template');

/**
 * Copies a file from the {@link templateDirectory} to the {@link directory}.
 * Respects the {@link pathInTemplateDirectory}.
 *
 * E.g. If the {@link directory} is `new-app`,
 * and the {@link pathInTemplateDirectory} is `foo/bar/baz.ts`,
 * it will copy the file from `template/foo/bar/baz.ts` to `new-app/foo/bar/baz.ts`.
 *
 * @param directory The directory to copy to.
 * @param pathInTemplateDirectory The file in the {@link templateDirectory} to copy from.
 */
async function copyFromTemplate(
    directory: string,
    pathInTemplateDirectory: string
): Promise<void> {
    const source: string = path.join(
        templateDirectory,
        pathInTemplateDirectory
    );
    const destination: string = path.join(directory, pathInTemplateDirectory);
    const destinationDirectory: string = path.dirname(destination);

    await fs.promises.mkdir(destinationDirectory, { recursive: true });
    return fs.promises.copyFile(source, destination);
}

/**
 * Copies a handlebars file from the {@link templateDirectory} to the {@link directory} using the given {@link config}.
 * Respects the {@link pathInTemplateDirectory}.
 * Will trim the `.handlebars` extension from the {@link pathInTemplateDirectory}.
 *
 * E.g. If the {@link directory} is `new-app`,
 * and the {@link pathInTemplateDirectory} is `foo/bar/baz.ts.handlebars`,
 * it will copy the file from `template/foo/bar/baz.ts.handlebars` to `new-app/foo/bar/baz.ts`,
 * and use the {@link config} for whatever values are needed in the handlebars file.
 *
 * @param config The {@link FeatureConfig} to populate the handlebars file with.
 * @param directory The directory to copy to.
 * @param pathInTemplateDirectory The file in the {@link templateDirectory} to copy from.
 * Expects the file to have a `.handlebars` extension.
 */
async function copyFromHandlebars(
    config: FeaturesConfig,
    directory: string,
    pathInTemplateDirectory: string
): Promise<void> {
    const handlebarsFile: string = path.join(
        templateDirectory,
        pathInTemplateDirectory
    );
    // This should remove the `.handlebars` extension.
    const parsedPath = path.parse(pathInTemplateDirectory);
    const destination: string = path.join(
        directory,
        parsedPath.dir,
        parsedPath.name
    );
    const destinationDirectory: string = path.dirname(destination);

    const buffer: Buffer = await fs.promises.readFile(handlebarsFile);
    const template = handlebars.compile(buffer.toString());
    const content: string = template(config);
    await fs.promises.mkdir(destinationDirectory, { recursive: true });
    return fs.promises.writeFile(destination, content);
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
    directory = clipanion.Option.String('--directory', {
        description: `The directory to initialize. Defaults to the example name, if not supplied`
    });

    /**
     * This option allows App developers to select an example to initialize with.
     *
     * This is mutually exclusive with the `--features` option.
     */
    example = clipanion.Option.String('--example', {
        description: `The example to initialize. Defaults to the \`${defaultExample}\`, if not supplied. Cannot be used with the \`--feature\` option`
    });

    /**
     * This option allows App developers to select the features they want to initialize with.
     * It initialize multiple features by separating them with commas.
     *
     * This is mutually exclusive with the `--example` option.
     */
    features = clipanion.Option.String('--features', {
        description: `The features to initialize. Must be one of ${features.join(
            ', '
        )}. Can initialize multiple features by separating them with commas. Cannot be used with the \`--example\` option`,
        validator: typanion.isArray(
            typanion.isOneOf(
                features.map(feature => typanion.isLiteral(feature))
            ),
            {
                delimiter: ','
            }
        )
    });

    /**
     * This option controls whether to perform `npm install`/`yarn install`.
     */
    install = clipanion.Option.Boolean('--install', true, {
        description: `Run the install command. Respects the package manager choice (\`npm\` or \`yarn\`). Turn off installs with \`--no-install\``
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
        const directory = this.directory ?? this.example ?? defaultExample;

        this.logDebug({
            options: {
                commit: this.commit,
                directory,
                example: this.example,
                features: this.features,
                install: this.install,
                verbose: this.verbose
            }
        });

        // We don't want to deal with both `--examples` and `--features` at the same time.
        if (this.example != null && this.features != null) {
            return Promise.reject(
                new Error(
                    `Cannot use both \`--example\` and \`--features\` at the same time. Please choose one or the other`
                )
            );
        }

        // If neither `--example` nor `--features` was given,
        // default to `--example` using the default example.
        if (this.example == null && this.features == null) {
            this.example = defaultExample;
        }

        this.logInfo(`Creating ${directory} directory`);
        await fs.promises.mkdir(directory, { recursive: true });
        this.logDebug(`Created ${directory} directory`);

        await this.handleExample(directory);
        await this.handleFeatures(directory);
        await this.handleInstall(directory);

        this.logInfo('');
        this.logInfo("You're all setup and ready to go!");
        this.logInfo(
            'Visit https://docs.datadoghq.com/developers/datadog_apps for documentation.'
        );
    }

    private async handleExample(directory: string): Promise<void> {
        if (!this.example) {
            return;
        }

        this.logInfo(`Downloading ${this.example} example…`);
        await pipeline(
            got.default.stream(
                `https://github.com/DataDog/apps/archive/${this.commit}.tar.gz`
            ),
            tar.extract({ cwd: directory, stripComponents: 3 }, [
                `apps-${this.commit}/examples/${this.example}`
            ])
        );
        this.logDebug(`Downloaded ${this.example} example`);
    }

    private async handleFeatures(directory: string): Promise<void> {
        if (this.features == null || this.features.length === 0) {
            return;
        }

        this.logInfo(`Initializing the following features: ${this.features}…`);
        const config: FeaturesConfig = {
            customWidget: this.features.includes('custom-widget'),
            dashboardCogMenu: this.features.includes('dashboard-cog-menu'),
            modal: this.features.includes('modal'),
            sidePanel: this.features.includes('side-panel')
        };

        // Top-level files
        await copyFromTemplate(directory, '.gitignore');
        await copyFromTemplate(directory, '.prettierignore');
        await copyFromTemplate(directory, 'package.json');
        await copyFromTemplate(directory, 'README.md');
        await copyFromTemplate(directory, 'tsconfig.json');

        // `/public` files
        await copyFromHandlebars(
            config,
            directory,
            path.join('public', '_redirects.handlebars')
        );
        await copyFromTemplate(directory, path.join('public', 'favicon.ico'));
        await copyFromTemplate(directory, path.join('public', 'index.html'));
        await copyFromTemplate(directory, path.join('public', 'robots.txt'));

        // `/src` files
        await copyFromTemplate(directory, path.join('src', 'index.css'));
        await copyFromTemplate(
            directory,
            path.join('src', 'react-app-env.d.ts')
        );
        await copyFromHandlebars(
            config,
            directory,
            path.join('src', 'index.tsx.handlebars')
        );

        // `/src/controller` files
        await copyFromHandlebars(
            config,
            directory,
            path.join('src', 'controller', 'index.ts.handlebars')
        );

        if (config.customWidget) {
            await copyFromTemplate(
                directory,
                path.join('src', 'custom-widget', 'custom-widget.css')
            );
            await copyFromTemplate(
                directory,
                path.join('src', 'custom-widget', 'index.tsx')
            );
        }

        if (config.dashboardCogMenu) {
            await copyFromTemplate(
                directory,
                path.join('src', 'controller', 'dashboard-cog-menu.ts')
            );
        }

        if (config.modal) {
            await copyFromTemplate(
                directory,
                path.join('src', 'controller', 'modal.ts')
            );
            await copyFromTemplate(
                directory,
                path.join('src', 'modal', 'index.tsx')
            );
        }

        if (config.sidePanel) {
            await copyFromTemplate(
                directory,
                path.join('src', 'side-panel', 'index.tsx')
            );
        }

        this.logDebug(`Initialized the following features: ${this.features}`);
    }

    private async handleInstall(directory: string): Promise<void> {
        if (!this.install) {
            return;
        }

        this.logInfo('Installing dependencies…');
        const installResult = await pkgInstall.projectInstall({
            cwd: directory,
            stdio: 'inherit'
        });
        if (installResult.code !== 0) {
            this.logDebug('Error installing dependencies', {
                installResult
            });
            return Promise.reject(new Error(installResult.stderr));
        }
        this.logDebug('Installed dependencies', { installResult });
    }

    private logDebug(message?: unknown, ...optionalParams: unknown[]): void {
        if (!this.verbose) {
            return;
        }

        console.log(message, ...optionalParams);
    }

    private logInfo(message?: unknown, ...optionalParams: unknown[]): void {
        console.log(message, ...optionalParams);
    }
}
