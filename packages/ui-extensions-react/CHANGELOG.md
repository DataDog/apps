# @datadog/ui-extensions-react

## 0.32.1

### Patch Changes

-   @datadog/ui-extensions-sdk@0.32.1

## 0.32.0

### Minor Changes

-   752e50f: Update SDK for interactions with Datadog Platform involving custom org configs

### Patch Changes

-   Updated dependencies [752e50f]
    -   @datadog/ui-extensions-sdk@0.32.0

## 0.31.1

### Patch Changes

-   7d0ee39: Add security monitoring hooks
-   Updated dependencies [7d0ee39]
    -   @datadog/ui-extensions-sdk@0.31.1

## 0.31.0

### Minor Changes

-   58a9034: Upgrade to react-scripts v5

### Patch Changes

-   Updated dependencies [58a9034]
    -   @datadog/ui-extensions-sdk@0.31.0

## 0.30.1

### Patch Changes

-   9b03834: Add a few react hooks (`useCustomWidgetOption`, `useCustomWidgetOptionBoolean`, `useCustomWidgetOptionString`) for working with custom widget options.

    Dealing with custom widget options can be a bit difficult to get right.
    You have to at least:
    grab the initial options from the context,
    listen for changes on the event,
    unsubscribe from event changes when unmounted,
    and check that the value actually exists.

    These new hooks hopefully make that easier.
    They manage all the intricacies of dealing with custom widget options so the App can focus on the logic that's important.

-   Updated dependencies [9b03834]
    -   @datadog/ui-extensions-sdk@0.30.1

## 0.30.0

### Minor Changes

-   9cd3715: Deprecate granular dashboard change events in favor of context_change

### Patch Changes

-   Updated dependencies [9cd3715]
    -   @datadog/ui-extensions-sdk@0.30.0

## 0.29.0

### Minor Changes

-   12e9654: Notifications

### Patch Changes

-   Updated dependencies [4a58870]
    -   @datadog/ui-extensions-sdk@0.29.0

## 0.28.0

### Minor Changes

-   a9208fa: Remove a bunch of dead code.

    We remove both `AuthStateStatus` and `Host` enums.
    We also remove the `MockLocalStorage` test helper.
    None of these things were used in the codebase anymore.

### Patch Changes

-   7a7d318: Add a react hook (`useTemplateVariable`) for working template variables.

    Dealing with template variables can be a bit difficult to get right.
    You have to at least:
    grab the initial variables from the context,
    listen for changes to the context,
    unsubscribe from event changes when unmounted,
    and search through all the template variables to find the one you're looking for.

    This new `useCustomWidgetOptions` hook hopefully makes that easier.
    It manages all the intricacies of dealing with template variables so the App can focus on the logic that's important.

-   Updated dependencies [a9208fa]
    -   @datadog/ui-extensions-sdk@0.28.0

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
