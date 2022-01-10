---
'@datadog/create-app': patch
'@datadog/framepost': patch
'@datadog/ui-extensions-sdk': patch
---

Bump `typescript` to 4.5.4 and remove from explicit `devDependencies`.

We move the dependency up to the root `package.json` for consistency across projects.
