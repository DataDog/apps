---
'@datadog/ui-extensions-sdk': minor
---

-   Remove `RequireKeys` from exports.
    This is an internal helper.
    We don't actually want to export this and have it be part of the public API.
-   Add `DebugClient`, `EventClient`, and `RequestClient` to break cyclical dependency.
    These are not intended to be used outside of the SDK.
    They are only intended to be used internally.
-   Don't expose underlying `@datadog/framepost` client in `DDClient`.
    We don't intend App developers to need/want to use this implementation detail.
