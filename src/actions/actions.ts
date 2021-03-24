// Actions are UiAppRequestType requests that are sent from Datadog to the parent dashboard
import type { DDClient } from '../client/client';
import { UiAppRequestType } from '../constants';
import type { Timeframe } from '../types';

export class DDActionsClient {
    private readonly client: DDClient;

    constructor(client: DDClient) {
        this.client = client;
    }

    async setDashboardCursor({ timestamp }: SetDashboardCursorRequest) {
        return this.client.framePostClient.request<SetDashboardCursorRequest>(
            UiAppRequestType.SET_DASHBOARD_CURSOR,
            {
                timestamp
            }
        );
    }

    async setDashboardTimeframe({ timeframe }: SetDashboardTimeframeRequest) {
        return this.client.framePostClient.request<SetDashboardTimeframeRequest>(
            UiAppRequestType.SET_DASHBOARD_TIMEFRAME,
            {
                timeframe
            }
        );
    }

    async setDashboardTemplateVars({ vars }: SetDashboardTemplateVarsRequest) {
        return this.client.framePostClient.request<SetDashboardTemplateVarsRequest>(
            UiAppRequestType.SET_DASHBOARD_TEMPLATE_VARS,
            {
                vars
            }
        );
    }
}

interface SetDashboardTimeframeRequest {
    timeframe: Timeframe;
}

interface SetDashboardCursorRequest {
    timestamp: number | null; // Match
}

interface SetDashboardTemplateVarsRequest {
    vars: Record<string, string>; // Doesn't have to set every var. Parent takes care of merging with current.
}
