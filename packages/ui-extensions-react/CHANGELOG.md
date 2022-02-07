# @datadog/ui-extensions-react

## 0.27.1

### Patch Changes

-   d8c24b2: Fix custom widgets not validating the feature is enabled.

    For consistency with the other features,
    we make sure that `DDDashboardCustomWidgetClient.updateOptions` validates that the `FeatureType.DASHBOARD_CUSTOM_WIDGET` feature is enabled.
    It's likely that the parent wouldn't allow this,
    but the error message is more consistent on the SDK-side of things.

-   Updated dependencies [d8c24b2]
    -   @datadog/ui-extensions-sdk@0.27.1

## 0.27.0

### Patch Changes

-   Updated dependencies [c68624f]
    -   @datadog/ui-extensions-sdk@0.27.0

## 0.26.0

### Minor Changes

-   df17b3f: Create a new package for UI Extensions with the React framework.

    This package provides helpers that make working with the SDK in React a bit easier.

### Patch Changes

-   Updated dependencies [df17b3f]
-   Updated dependencies [1f2d674]
    -   @datadog/ui-extensions-sdk@0.26.0
