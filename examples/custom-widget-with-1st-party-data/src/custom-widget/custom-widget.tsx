import { useCustomWidgetOptionString } from '@datadog/ui-extensions-react';
import { DDClient } from '@datadog/ui-extensions-sdk';
import React from 'react';
import ReactDOM from 'react-dom';
import { Content, ContentProps } from './content';
import { MonitorProps } from './monitor';
import { parseMonitors } from './parser';

type CustomWidgetProps = {
    client: DDClient;
};

/**
 * This component brings together all the pieces and renders a custom widget.
 */
function CustomWidget(props: CustomWidgetProps): JSX.Element {
    const [content, setContent] = React.useState<ContentProps>({
        type: 'loading'
    });
    const filter = useCustomWidgetOptionString(props.client, 'filter');

    React.useEffect(() => {
        /**
         * We set the query string parameters for the `/api/v1/monitor` API.
         *
         * @see https://docs.datadoghq.com/api/latest/monitors/#get-all-monitor-details.
         */
        const params: Record<string, string> = {
            /**
             * We choose to only look at the first page of monitors.
             */
            page: '0',
            /**
             * We only want a few monitors at a time.
             */
            page_size: '10'
        };
        /**
         * Set the `name` parameter if there's something to filter by.
         */
        if (filter != null) {
            params.name = filter;
        }

        /**
         * In order to access any of the Datadog API,
         * we need to make sure the App has an OAuth client with the correct scopes.
         *
         * Since we want to access the `/api/v1/monitor` API,
         * we need the `monitors_read` scope.
         *
         * @see https://docs.datadoghq.com/api/latest/scopes.
         */
        props.client.api
            .get('/api/v1/monitor', { params })
            .then((response: unknown): void => {
                const newMonitors: MonitorProps[] = parseMonitors(response);
                if (newMonitors.length === 0) {
                    setContent({ type: 'no monitors' });
                    return;
                }

                setContent({ type: 'monitors', props: newMonitors });
            })
            .catch((error: unknown): void => {
                setContent({ type: 'error', error });
            });
    }, [filter, props.client.api]);

    return (
        <div
            style={{
                fontFamily: 'helvetica, arial, sans-serif',
                margin: '2rem'
            }}
        >
            <h2>Monitors</h2>
            <Content {...content} />
        </div>
    );
}

export function renderCustomWidget(client: DDClient) {
    ReactDOM.render(
        <React.StrictMode>
            <CustomWidget client={client} />
        </React.StrictMode>,
        document.getElementById('root')
    );
}
