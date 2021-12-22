---
'@datadog/framepost': minor
'@datadog/ui-extensions-sdk': minor
---

Ensure full shutdown of requests on framepost client destroy. Additional errors may now be thrown from request handlers in rare side-cases. This shoult mainly not effect the SDK, but we are bumping the minor version to be safe.
