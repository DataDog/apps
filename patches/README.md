# `npm` patches

This directory holds patches for `npm` dependencies.

## `@changesets/assemble-release-plan`

This patch makes it so peer dependencies that are exact don't force a major bump in `changesets`.
We should still be able to make major bumps,
but they shouldn't happen due to exact peer dependencies.

This only really works for packages that are "linked."
We should probably add a check for that in the same logic,
but we should really raise the issue upstream and see if there's a fix for it.

It's not clear whether or not this will go away when ["fixed" packages][] are implemented.

["fixed" packages]: https://github.com/changesets/changesets/pull/690
