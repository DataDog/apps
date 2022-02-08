---
'@datadog/ui-extensions-react': minor
'@datadog/ui-extensions-sdk': minor
---

Remove a bunch of dead code.

We remove both `AuthStateStatus` and `Host` enums.
We also remove the `MockLocalStorage` test helper.
None of these things were used in the codebase anymore.
