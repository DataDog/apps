# Contributing

This document provides some basic guidelines for contributing to this repository.
To propose improvements, feel free to submit a pull request.

## Pull Requests

We use [`changesets`][] to manage releases.
If you're making a change, and you'd like it to be released, please create a [changeset][] in your PR.
You can create a [changeset][] with the following (interactive) command:

```Console
$ yarn changeset add
```

This will walk you through all the steps you need to take to create your [changeset][].

### When to create a [changeset][]?

The first thing to remember is that [not every change requires a changeset](https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md#not-every-change-requires-a-changeset).
It's perfectly fine to make some small change to fix a typo or clean up whitespace or something else without making a [changeset][].
Adding or updating an example is also a fine time to skip adding a [changeset][].

For the most part, we want to add a [changeset][] when we want people to get new releases of packages.
If there's a bug fix, new feature, or something along those lines for a package, we almost assuredly want to have an accompanying [changeset][].

[`changesets`]: https://github.com/changesets/changesets
[changeset]: https://github.com/changesets/changesets/blob/main/docs/detailed-explanation.md
