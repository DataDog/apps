# Design

## Initialize Command

There are two ways to use this command: with [examples](#examples) and with [features](#features).

### Examples

The current model this package works off of is that there's an `examples` directory at the top-level of this repo.
With this `examples` directory, we should be able to initialize with any of the actual examples.
This package downloads a tarball of the repo, extracts it, then copies only the specific example into the App developer's file system.
Once the example is on disk, it runs either `npm install` or `yarn install` depending on how it's called:
`npm init` gives `npm install`, `yarn create` gives `yarn install`.

### Features

There is a `src/template` directory in this package that is used to generate the individual features.
The majority of the files are used directly since there is a general structure necessary to run an App.
In some of these files, we use [handlebars][] to generate the correct code.
The features that are given and used to only copy over the necessary files and generate the necessary code.
For example,
`yarn create @datadog/app --features dashboard-cog-menu,side-panel` would generate all the normal scaffolding and also only generate files specific to the dashboard cog menu and side panel features.
Whereas `yarn create @datadog/app --features custom-widget` would generate all the normal scaffolding and also only generate files specific to the custom widget feature.

## Build

This package builds and bundles to a single minified JavaScript file.
This is done so using `npm init`/`yarn create` is fast.
Since everything is in this single file all that's necessary is to download the package.
Without this approach, all of the runtime dependencies would have to be installed.

That said, if we find that this approach doesn't work us for some reason (build process issues, too abrasive in theory, etc.),
we can always move to something else.
It's not integral to this package that it work this way, it's just currently an easy thing to do.

[handlebars]: https://handlebarsjs.com/
