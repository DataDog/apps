# `@datadog/create-app`

An [`npm init`][npm init] package for creating a [Datadog App][].

## Usage

If you use `npm`:

```Console
$ npm init @datadog/app
```

If you use `yarn`:

```Console
$ yarn create @datadog/app
```

This will download and install the [starter-kit][].

## Options

### `--commit`

Use a specific commit for the example.
Defaults to the `master` branch, if not specified.

### `--directory`

Specify where to create the [Datadog App][].
Defaults to `starter-kit`.

### `--example`

The example to initialize.
Defaults to the `starter-kit`, if not supplied

### `--install`

Perform the package manager installation (`npm install` vs. `yarn install`).
Defaults to performing the installation, if not supplied.
Can turn off package manager installation with `--no-install`.

### `--verbose`

Prints out debugging information.

[datadog app]: https://docs.datadoghq.com/developers/datadog_apps
[npm init]: https://docs.npmjs.com/cli/v8/commands/npm-init
[starter-kit]: https://github.com/DataDog/apps/tree/master/examples/starter-kit
