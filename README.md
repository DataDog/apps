# Datadog Apps

Datadog Apps allow third party developers to extend the native functionality offered by Datadog. This initiative is in a private beta release, please contact Datadog support to request access.

## Documentation

-   [Getting Started](docs/en/getting-started.md)
-   [Programming Model](docs/en/programming-model.md)
-   [Frequently Asked Questions](docs/en/faq.md)
-   [UI-Extension Design Guidelines](docs/en/ui-extensions-design-guidelines.md)
-   [Datadog API Reference](https://docs.datadoghq.com/api/latest/)

    -   Note: the TypeScript examples in the Datadog API Reference and the [`@datadog/datadog-api-client`](https://www.npmjs.com/package/@datadog/datadog-api-client) are currently Node.js-only, while Datadog Apps are browser-only. The API Reference is useful to understand the Datadog API, but the examples will need some conversion for the browser.

        We are working on updating the [`@datadog/datadog-api-client`](https://www.npmjs.com/package/@datadog/datadog-api-client) to work seamlessly with the [`@datadog/ui-extensions-sdk`](https://www.npmjs.com/package/@datadog/ui-extensions-sdk). In the mean-time, we recommend accessing the Datadog API with the [`@datadog/ui-extensions-sdk` directly](docs/en/programming-model.md#accessing-the-api-through-the-sdk).

## Examples

-   [Starter Kit](examples/starter-kit)

## Code resources

-   [SDK](https://github.com/Datadog/ui-extensions-sdk)
