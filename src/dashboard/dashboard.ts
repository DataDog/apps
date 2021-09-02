// Actions are UiAppRequestType requests that are sent from Datadog to the parent dashboard
import type { DDClient } from '../client/client';
import { RequestType } from '../constants';
import type { Timeframe } from '../types';

import { DDDashboardCogMenuClient } from './dashboard-cog-menu/dashboard-cog-menu';
import { DDDashboardCustomWidgetClient } from './dashboard-custom-widget/dashboard-custom-widget';

export class DDDashboardClient {
    private readonly client: DDClient;
    cogMenu: DDDashboardCogMenuClient;
    customWidget: DDDashboardCustomWidgetClient;

    constructor(client: DDClient) {
        this.client = client;
        this.cogMenu = new DDDashboardCogMenuClient(this.client);
        this.customWidget = new DDDashboardCustomWidgetClient(this.client);
    }

    async setCursor({ timestamp }: SetDashboardCursorRequest) {
        return this.client.framePostClient.request<SetDashboardCursorRequest>(
            RequestType.SET_DASHBOARD_CURSOR,
            {
                timestamp
            }
        );
    }

    async setTimeframe({ timeframe }: SetDashboardTimeframeRequest) {
        return this.client.framePostClient.request<
            SetDashboardTimeframeRequest
        >(RequestType.SET_DASHBOARD_TIMEFRAME, {
            timeframe
        });
    }
}

interface SetDashboardTimeframeRequest {
    timeframe: Timeframe;
}

interface SetDashboardCursorRequest {
    timestamp: number | null;
}
