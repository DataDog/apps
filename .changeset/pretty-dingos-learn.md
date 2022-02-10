---
'@datadog/ui-extensions-react': patch
---

Add a react hook (`useTemplateVariable`) for working template variables.

Dealing with template variables can be a bit difficult to get right.
You have to at least:
grab the initial variables from the context,
listen for changes to the context,
unsubscribe from event changes when unmounted,
and search through all the template variables to find the one you're looking for.

This new `useCustomWidgetOptions` hook hopefully makes that easier.
It manages all the intricacies of dealing with template variables so the App can focus on the logic that's important.
