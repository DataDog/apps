---
'@datadog/ui-extensions-react': patch
'@datadog/ui-extensions-sdk': patch
---

Fix custom widgets not validating the feature is enabled.

For consistency with the other features,
we make sure that `DDDashboardCustomWidgetClient.updateOptions` validates that the `FeatureType.DASHBOARD_CUSTOM_WIDGET` feature is enabled.
It's likely that the parent wouldn't allow this,
but the error message is more consistent on the SDK-side of things.
