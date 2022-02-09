---
'@datadog/create-app': minor
'@datadog/ui-extensions-react': patch
---

Add a react hook (`useCustomWidgetOptions`) for working custom widget options.

Dealing with custom widget options can be a bit difficult to get right.
You have to at least:
grab the initial options from the context,
listen for changes on the event,
unsubscribe from event changes when unmounted,
and check that the value actually exists.

This new `useCustomWidgetOptions` hook hopefully makes that easier.
It manages all the intricacies of dealing with custom widget options so the App can focus on the logic that's important.
