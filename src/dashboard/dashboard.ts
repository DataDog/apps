// Actions are UiAppRequestType requests that are sent from Datadog to the parent dashboard
import type { DDClient } from '../client/client';
import { UiAppRequestType } from '../constants';
import type { Timeframe } from '../types';

export class DDDashboardClient {
    private readonly client: DDClient;

    constructor(client: DDClient) {
        this.client = client;
    }

    async setCursor({ timestamp }: SetDashboardCursorRequest) {
        return this.client.framePostClient.request<SetDashboardCursorRequest>(
            UiAppRequestType.SET_DASHBOARD_CURSOR,
            {
                timestamp
            }
        );
    }

    async setTimeframe({ timeframe }: SetDashboardTimeframeRequest) {
        return this.client.framePostClient.request<
            SetDashboardTimeframeRequest
        >(UiAppRequestType.SET_DASHBOARD_TIMEFRAME, {
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
