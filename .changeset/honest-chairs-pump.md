---
'@datadog/ui-extensions-react': minor
'@datadog/ui-extensions-sdk': minor
---

Handle custom widget dynamic options from the controller instead of sending them from the widget.

Before, the dynamic options could only be sent from the widget using `DDDashboardCustomWidgetClient.updateOptions`.
For example:

```TypeScript
import * as uiExtensionsSDK from '@datadog/ui-extensions-sdk';
import * as React from 'react';

const client = uiExtensionsSDK.init();

export const CustomWidget: React.FunctionComponent = () => {
    …

    client.dashboard.customWidget.updateOptions([
      {
        type: uiExtensionsSDK.WidgetOptionItemType.BOOLEAN,
        name: 'option-1',
        label: 'Enable option 1?',
      },
      {
        type: uiExtensionsSDK.WidgetOptionItemType.BOOLEAN,
        name: 'option-2',
        label: 'Enable option 2?',
      },
    ]);

    …
}
```

This patterned allowed App developers to control when and how to update the dynamic options of a custom widget.
Over time,
we've found that this pattern has a few flaws and doesn't line up with the other dynamic behavior in the SDK.

We're moving to a more consistent pattern for custom widget dynamic options.
Instead of the App developer controlling lifecycle of dynamic options from the widget,
The App developer will need to respond to requests for the dynamic options from the controller using `DDDashboardCustomWidgetClient.onOptionsRequest`.
This is similar to how dashboard cog menu items and widget context menu items work.

The above example would move from the widget file to the controller:

```TypeScript
import * as uiExtensionsSDK from '@datadog/ui-extensions-sdk';

export function setup() {
    const client = uiExtensionsSDK.init();
    …

    client.dashboard.customWidget.onOptionsRequest(
        async (
            request: uiExtensionsSDK.GetDashboardCustomWidgetOptionsRequest
        ): Promise<uiExtensionsSDK.GetDashboardCustomWidgetOptionsResponse> => {
            return {
                options: [
                    {
                        type: uiExtensionsSDK.WidgetOptionItemType.BOOLEAN,
                        name: 'option-1',
                        label: 'Enable option 1?',
                    },
                    {
                        type: uiExtensionsSDK.WidgetOptionItemType.BOOLEAN,
                        name: 'option-2',
                        label: 'Enable option 2?',
                    },
                ],
            };
        }
    );

    …
}
```

This should still allow most all of the same behavior as before,
but it will have to happen in the controller instead of in the widget.

The previous behavior using `DDDashboardCustomWidgetClient.updateOptions` is deprecated and will be removed in a future release.
