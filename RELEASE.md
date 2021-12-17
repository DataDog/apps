# Release Documentation

## Canary releases

We use [`auto`][] to automate "canary" releases to each package.
A "canary" release is a release on `npm` that can be used just by creating a PR.

When a PR is opened, [`auto`][] will create a "canary" release, publish it to `npm`, and report back in the PR how to use the "canary" release.
The "canary" release can be used to test out some changes without fully merging the PR.

## Package releases

We use [`changesets`][] to help with normal package releases.

[`changesets`][] will manage a long-running PR that batches changes together.
When a normal PR is merged, [`changsets`][] will keep track of any [changeset][]s in this long-running PR.
When we're ready to release some number of packages, we can merge this long-running PR and [`changesets`][] will release all packages with a [changeset][].

[`auto`]: https://intuit.github.io/auto/
[`changesets`]: https://github.com/changesets/changesets
[changeset]: https://github.com/changesets/changesets/blob/main/docs/detailed-explanation.md
