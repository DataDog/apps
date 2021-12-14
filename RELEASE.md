# Release Documentation

## How it works

We use [`auto`][auto] to automate releases to each package.

### PR workflow

When a PR is opened, the correct type of release should be selected: major, minor, or patch.
After the PR is merged, [`auto`][auto] will create the appropriate release, publish it to `npm`, and report back in the PR what the newly released version is.

### Canary workflow

When a PR is opened, [`auto`][auto] will create a "canary" release, publish it to `npm`, and report back in the PR how to use the "canary" release.
The "canary" release can be used to test out some changes without fully merging the PR.

[auto]: https://intuit.github.io/auto/
