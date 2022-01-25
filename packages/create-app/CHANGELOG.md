# v1.0.1 (Fri Dec 17 2021)

## 1.0.3

### Patch Changes

-   1f2d674: Bump `typescript` to 4.5.4 and remove from explicit `devDependencies`.

    We move the dependency up to the root `package.json` for consistency across projects.

## 1.0.2

### Patch Changes

-   47d0bf4: Default `--directory` flag to the name of the example.

    Instead of always defaulting to `starter-kit`,
    we default the directory to whatever the name of the example is.
    People can still override the directory by explicitly passing the `--directory` flag.

-   416f343: Add repository field to package.json

#### 🐛 Bug Fix

-   UIAPPS-69 Start on `npm init` package for creating a Datadog App [#70](https://github.com/DataDog/apps/pull/70) ([@joneshf-dd](https://github.com/joneshf-dd))
-   Merge remote-tracking branch 'origin/master' into hardy.jones/uiapps-69/setup-npm-init-package ([@joneshf-dd](https://github.com/joneshf-dd))
-   UIAPPS-69 Publish package publicly ([@joneshf-dd](https://github.com/joneshf-dd))
-   UIAPPS-69 Start an npm init package ([@joneshf-dd](https://github.com/joneshf-dd))

#### Authors: 1

-   Hardy Jones ([@joneshf-dd](https://github.com/joneshf-dd))
