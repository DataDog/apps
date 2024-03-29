# Changesets

Hello and welcome! This folder has been automatically generated by `@changesets/cli`, a build tool that works
with multi-package repos, or single-package repos to help you version and publish your code. You can
find the full documentation for it [in our repository](https://github.com/changesets/changesets)

We have a quick list of common questions to get you started engaging with this project in
[our documentation](https://github.com/changesets/changesets/blob/main/docs/common-questions.md)

## Config

We try to clarify the configuration that might not be immediately straight-forward.

### `ignore`

We're setting this to all of the examples so we don't end up trying to bump their versions.
It seems like that's not the proper way to use this configuration,
but it doesn't look like there's another way to get the behavior we want.

### `linked`

We're linking the `@datadog/ui-extensions-*` packages together because we want them to all have the same version.
This is only part of the story.
`linked` does keep the versions the same,
but only if every package has a changeset.
The other part of the story is the [check fixed packages script][].
This script makes sure we should always have a changeset for all of the `@datadog/ui-extensions-*` packages if any of them changes.

If `changesets` gets a feature to have actually "fixed" packages,
we can move to using that instead of this.

[check fixed packages script]: ../scripts/check-fixed-packages-ui-extensions.js
