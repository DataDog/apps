# v0.24.2 (Thu Dec 16 2021)

## 0.32.2

### Patch Changes

-   5d878a0: update dependencies

## 0.32.1

### Patch Changes

-   Updated dependencies [d2430a4]
    -   @datadog/framepost@0.4.0

## 0.32.0

### Minor Changes

-   752e50f: Update SDK for interactions with Datadog Platform involving custom org configs

## 0.31.1

### Patch Changes

-   7d0ee39: Add security monitoring hooks

## 0.31.0

### Minor Changes

-   58a9034: Upgrade to react-scripts v5

## 0.30.1

### Patch Changes

-   9b03834: Bump for release of `@datadog/ui-extensions-react` package.

## 0.30.0

### Minor Changes

-   9cd3715: Deprecate granular dashboard change events in favor of context_change

## 0.29.0

### Patch Changes

-   4a58870: Add notification hook

## 0.28.0

### Minor Changes

-   a9208fa: Remove a bunch of dead code.

    We remove both `AuthStateStatus` and `Host` enums.
    We also remove the `MockLocalStorage` test helper.
    None of these things were used in the codebase anymore.

## 0.27.1

### Patch Changes

-   d8c24b2: Fix custom widgets not validating the feature is enabled.

    For consistency with the other features,
    we make sure that `DDDashboardCustomWidgetClient.updateOptions` validates that the `FeatureType.DASHBOARD_CUSTOM_WIDGET` feature is enabled.
    It's likely that the parent wouldn't allow this,
    but the error message is more consistent on the SDK-side of things.

## 0.27.0

### Minor Changes

-   c68624f: - Remove `RequireKeys` from exports.
    This is an internal helper.
    We don't actually want to export this and have it be part of the public API.
    -   Add `ContextClient`, `DebugClient`, `EventClient`, `LoggerClient`, and `RequestClient` to break cyclical dependency.
        These are not intended to be used outside of the SDK.
        They are only intended to be used internally.
    -   Don't expose underlying `@datadog/framepost` client in `DDClient`.
        We don't intend App developers to need/want to use this implementation detail.
    -   Break dependency cycles on `DDClient`.
        This is entirely and internal improvement.

## 0.26.0

### Minor Changes

-   df17b3f: Create a new package for UI Extensions with the React framework.

    This package provides helpers that make working with the SDK in React a bit easier.

### Patch Changes

-   1f2d674: Bump `typescript` to 4.5.4 and remove from explicit `devDependencies`.

    We move the dependency up to the root `package.json` for consistency across projects.

## 0.25.0

### Minor Changes

-   7e959d1: Ensure full shutdown of requests on framepost client destroy. Additional errors may now be thrown from request handlers in rare side-cases. This should mainly not affect the SDK, but we are bumping the minor version to be safe.

### Patch Changes

-   Updated dependencies [7e959d1]
    -   @datadog/framepost@0.3.0

## 0.24.5

### Patch Changes

-   ca3c3ae: Import framepost into monorepo

## 0.24.4

### Patch Changes

-   11cbf60: Update repository field in `package.json`

## 0.24.3

### Patch Changes

-   2c8581a: Drop `prettier` from `devDependencies`

    It's hoisted to the top of the monorepo.

#### 🐛 Bug Fix

-   Ignore generated `CHANGELOG.md` for `ui-extensions-sdk` [#71](https://github.com/DataDog/apps/pull/71) ([@joneshf-dd](https://github.com/joneshf-dd))
-   Ignore generated `CHANGELOG.md` ([@joneshf-dd](https://github.com/joneshf-dd))

#### Authors: 1

-   Hardy Jones ([@joneshf-dd](https://github.com/joneshf-dd))

---

# v0.24.1 (Tue Dec 14 2021)

#### 🐛 Bug Fix

-   UIAPPS-78 Bring in `apps` code [#61](https://github.com/DataDog/apps/pull/61) ([@nmuldavin](https://github.com/nmuldavin) [@rachelnicole](https://github.com/rachelnicole) [@joneshf-dd](https://github.com/joneshf-dd) [@jsonmercer](https://github.com/jsonmercer) [@enbashi](https://github.com/enbashi) [@wfa207](https://github.com/wfa207) [@maureengriswold12](https://github.com/maureengriswold12) [@cswatt](https://github.com/cswatt) [@DevonL](https://github.com/DevonL) [@apigirl](https://github.com/apigirl) [@RolfBates](https://github.com/RolfBates) [@tdimnet](https://github.com/tdimnet))
-   Merge branch 'master' of ../apps-for-monorepo into hardy.jones/uiapps-78/bring-in-apps-code ([@joneshf-dd](https://github.com/joneshf-dd))
-   UIAPPS-78 Fix `format`, `lint`, and `test` scripts ([@joneshf-dd](https://github.com/joneshf-dd))
-   UIAPPS-77 Start using a monorepo approach [#60](https://github.com/DataDog/apps/pull/60) ([@joneshf-dd](https://github.com/joneshf-dd))
-   UIAPPS-77 Move to `packages/ui-extensions-sdk` ([@joneshf-dd](https://github.com/joneshf-dd))

#### ⚠️ Pushed to `master`

-   Bump `@datadog/ui-extensions-sdk` to 0.24.0 ([@joneshf-dd](https://github.com/joneshf-dd))

#### Authors: 12

-   [@cswatt](https://github.com/cswatt)
-   [@DevonL](https://github.com/DevonL)
-   [@jsonmercer](https://github.com/jsonmercer)
-   [@maureengriswold12](https://github.com/maureengriswold12)
-   Hardy Jones ([@joneshf-dd](https://github.com/joneshf-dd))
-   Kaylyn ([@apigirl](https://github.com/apigirl))
-   Noah Muldavin ([@nmuldavin](https://github.com/nmuldavin))
-   Rachel White ([@rachelnicole](https://github.com/rachelnicole))
-   Rami Enbashi ([@enbashi](https://github.com/enbashi))
-   Rolf Bates ([@RolfBates](https://github.com/RolfBates))
-   Thomas Dimnet ([@tdimnet](https://github.com/tdimnet))
-   Wes Auyeung ([@wfa207](https://github.com/wfa207))
