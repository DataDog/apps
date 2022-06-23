import { DDClient } from '@datadog/ui-extensions-sdk';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { useSetupWidgetContextMenu } from './widget-context-menu';

type ControllerProps = {
    client: DDClient;
};

/**
 * This component renders the main controller.
 * The main controller responds to the initial handshake from Datadog and sets up any App-wide behavior.
 *
 * @see https://github.com/DataDog/apps/blob/-/docs/en/programming-model.md#main-controller-iframe
 */
function Controller(props: ControllerProps): JSX.Element {
    useSetupWidgetContextMenu(props.client);

    return (
        <>
            <div>The application controller is running in the background.</div>
            <a href="http://localhost:3000/custom-widget">
                Click here to open your custom widget
            </a>
        </>
    );
}

function renderController(client: DDClient) {
    ReactDOM.render(
        <React.StrictMode>
            <Controller client={client} />
        </React.StrictMode>,
        document.getElementById('root')
    );
}

export { renderController };
