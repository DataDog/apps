# @datadog/framepost

## 0.3.0

### Minor Changes

-   7e959d1: Ensure full shutdown of requests on framepost client destroy. Additional errors may now be thrown from request handlers in rare side-cases. This should mainly not affect the SDK, but we are bumping the minor version to be safe.

## 0.2.4

### Patch Changes

-   ca3c3ae: Import framepost into monorepo
