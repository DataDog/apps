import * as datadogAPIClient from '@datadog/datadog-api-client';
import { useContext } from '@datadog/ui-extensions-react';
import * as uiExtensionsSDK from '@datadog/ui-extensions-sdk';
import './../index.css';
import React from 'react';
import ReactDOM from 'react-dom';

import './custom-widget.css';
import 'typeface-roboto';
import 'milligram';
import {
    MetricsApiListActiveMetricsRequest,
    MetricsListResponse
} from '@datadog/datadog-api-client/dist/packages/datadog-api-client-v1';
import { createV1Configuration } from '../api-client-helpers';

const client = uiExtensionsSDK.init();

const metricsApi = new datadogAPIClient.v1.MetricsApi(
    createV1Configuration(client)
);

function CustomWidget() {
    const context = useContext(client);
    const [metrics, setMetrics] = React.useState<string[]>();

    React.useEffect(() => {
        const timeframe = context?.dashboard?.timeframe;
        if (timeframe == null) {
            return;
        }

        const params: MetricsApiListActiveMetricsRequest = {
            from: Math.floor(timeframe.start / 1000)
        };
        metricsApi
            .listActiveMetrics(params)
            .then((response: MetricsListResponse): void => {
                const metrics: string[] | undefined = response.metrics
                    ?.slice(0, 20)
                    ?.concat('…');
                setMetrics(metrics);
            });
    }, [context?.dashboard?.timeframe]);

    return (
        <>
            <h2>Metrics</h2>
            <pre>{JSON.stringify(metrics, null, 4)}</pre>
        </>
    );
}

export default function render() {
    ReactDOM.render(
        <React.StrictMode>{<CustomWidget />}</React.StrictMode>,
        document.getElementById('root')
    );
}
