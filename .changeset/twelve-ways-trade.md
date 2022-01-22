---
'@datadog/ui-extensions-sdk': minor
---

-   Remove `RequireKeys` from exports.
    This is an internal helper.
    We don't actually want to export this and have it be part of the public API.
-   Add `DebugClient` to break cyclical dependency.
    This is not intended to be used outside of the SDK.
    It is only intended to be used internally.
