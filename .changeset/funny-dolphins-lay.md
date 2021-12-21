---
'@datadog/create-app': patch
---

Default `--directory` flag to the name of the example.

Instead of always defaulting to `starter-kit`,
we default the directory to whatever the name of the example is.
People can still override the directory by explicitly passing the `--directory` flag.
