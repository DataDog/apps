# Frequently Asked Questions

## How do I provide logos for my App?

You can provide a temporary logo as a url while your app is under development in the Developer Platform. When you are ready to publish, we will work with you to create permanent and high-quality versions of your logo, including a dark mode variant.

## What programming language/framework should I use for developing my app?

You can use any web stack to build apps. The only requirement is to include our [SDK](https://github.com/DataDog/ui-extensions-sdk), which is a vanilla Javascript library with optional typescript definitions if needed.

## What can my app do?

Apps can extend the native functionality offered by Datadog. Right now we are in private alpha release and the features offered by the platform are limited to customizing dashboards. Your app can add custom widgets, modals, side panels, context menu or cog menu. Your apps can also communicate with Datadog by listening to and sending events.

## How does my app communicate with Datadog?

Most of the app features will be rendered in Datadog by an IFrame. More details can be found [here](./programming-model.md).

## Do you offer a styled components library so we can adhere to Datadog’s design and build native looking features?

Not at the moment, but we have a list of [design guidelines](./ui-extensions-design-guidelines.md).

## Can my app access data in Datadog?

Yes, an API client is provided as part of the SDK to access Datadog’s public API.

## What about authentication?

You can authenticate your app users by integrating your existing login mechanism through the SDK. More details can be found [here](./programming-model.md#authentication).

## What browsers do you support?

Our intention is to support all major browsers, however we have encountered some errors in both Safari and Firefox. We are actively investigating these issues, but in the meantime we recommend using Google Chrome when developing and using apps with UI Extensions.

## What information does Datadog collect about my code?

To ensure safety and reliability for our customers, Datadog collects information on all loaded resources and network calls executed in your app IFrames. The specific collection routines are open-source and can be viewed [here](https://github.com/DataDog/apps/tree/master/packages/ui-extensions-sdk/src/utils/security.ts). Please reach out to <apps@datadoghq.com> if you have further questions.