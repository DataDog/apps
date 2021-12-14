# Release Documentation

## Automatic releases

We use [`auto`][auto] to automate releases to each package.

### PR workflow

When a PR is opened, the correct type of release should be selected: major, minor, or patch.
After the PR is merged, [`auto`][auto] will create the appropriate release, publish it to `npm`, and report back in the PR what the newly released version is.

### Canary workflow

When a PR is opened, [`auto`][auto] will create a "canary" release, publish it to `npm`, and report back in the PR how to use the "canary" release.
The "canary" release can be used to test out some changes without fully merging the PR.

## Manual releases

There is not currently a (documented) manual release process; neither through GitHub Actions nor outside of GitHub Actions.
If we find that we need/want the ability to manually release through GitHub Actions, we can look into using the [`workflow_dispatch` event][workflow_dispatch] to [manually run a workflow][]

[auto]: https://intuit.github.io/auto/
[manually run a workflow]: https://docs.github.com/en/actions/managing-workflow-runs/manually-running-a-workflow#running-a-workflow
[workflow_dispatch]: https://docs.github.com/en/actions/managing-workflow-runs/manually-running-a-workflow#configuring-a-workflow-to-run-manually
