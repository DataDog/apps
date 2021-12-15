# Design

## Initialize Command

The current model this package works off of is that there's an `examples` directory at the top-level of this repo.
With this `examples` directory, we should be able to initialize with any of the actual examples.
This package downloads a tarball of the repo, extracts it, then copies only the specific example into the App developer's file system.
Once the example is on disk, it runs either `npm install` or `yarn install` depending on how it's called:
`npm init` gives `npm install`, `yarn create` gives `yarn install`.

## Build

This package builds and bundles to a single minified JavaScript file.
This is done so using `npm init`/`yarn create` is fast.
Since everything is in this single file all that's necessary is to download the package.
Without this approach, all of the runtime dependencies would have to be installed.

That said, if we find that this approach doesn't work us for some reason (build process issues, too abrasive in theory, etc.),
we can always move to something else.
It's not integral to this package that it work this way, it's just currently an easy thing to do.
