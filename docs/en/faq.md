# Frequently Asked Questions

## What programming language/framework should I use for developing my app?

You can use any web stack to build apps. The only requirement is to include our [SDK](https://github.com/DataDog/ui_apps_sdk), which is a vanilla Javascript library with optional typescript definitions if needed.

## What can my app do?
Apps can extend the native functionality offered by DataDog. Right now we are in private alpha release and the features offered by the platform are limited to customizing dashboards. Your app can add custom widgets, modals, side panels, context menu or cog menu. Your apps can also communicate with Datadog by listening to and sending events.

## How does my app communicate with Datadog?
Most of the app features will be rendered in Datadog by an IFrame. More details can be found [here](./programming-model.md).

## Do you offer a styled components library so we can adhere to Datadog’s design and build native looking features?
Not at the moment, but we have a list of [design guidelines](./design-guidelines.md).

## Can my app access data in Datadog?
Yes, an API client is provided as part of the SDK to access Datadog’s public API.

## What about authentication?
You can authenticate your app users by integrating your existing login mechanism through the SDK. More details can be found [here](./programming-model.md#authentication).

## What browsers do you support?
Our intention is to support all major browsers, however we have encountered some errors in both Safari and Firefox. We are actively investigating these issues, but in the mean time we reocmmend using Google Chrome when developing and using UI Extension apps.
