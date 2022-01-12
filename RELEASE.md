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

## `@datadog/ui-extensions-*` packages

These packages are all released at the same version.
The intention is to make it so App Developers have an easier time with updates.
If we say,
"Check out this wonderful feature in 0.36.0!"
App Developers should be able to update whatever `@datadog/ui-extensions-*` packages they have to 0.36.0 and be on their way.

The alternative would be to allow different versions for each package.
That allows more flexibility and lower version churn at the expense of confusion with version updates.
A similar example to the above might be worded like,
"Check out this wonderful feature in 0.36.0 of `@datadog/ui-extensions-sdk`, 2.3.0 of `@datadog/ui-extensions-react`, 1.46.0 of `@datadog/ui-extensions-vue`, etc."
While that's a model that many other groups of packages follow,
we're opting for keeping all the versions the same.

[`auto`]: https://intuit.github.io/auto/
[`changesets`]: https://github.com/changesets/changesets
[changeset]: https://github.com/changesets/changesets/blob/main/docs/detailed-explanation.md
