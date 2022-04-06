import { DDClient } from '@datadog/ui-extensions-sdk';
import { useContext } from '@datadog/ui-extensions-react';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { parseHostInformation } from '../host';

type ModalProps = {
    client: DDClient;
};

/**
 * This component renders the modal content for {@link HostInformation}.
 */
function Modal(props: ModalProps): JSX.Element {
    const context = useContext(props.client);
    /**
     * We are expecting the modal to only be rendered when there is data coming through in the `args`.
     * We attempt to parse the {@link HostInformation} and render nothing if it doesn't exist.
     */
    const hostInformation = parseHostInformation(context?.args);
    if (hostInformation == null) {
        return <></>;
    }

    return (
        <div
            style={{
                fontFamily: 'helvetica, arial, sans-serif',
                margin: '0.5rem'
            }}
        >
            <h2>Information about {hostInformation.name}</h2>
            <div
                style={{
                    display: 'grid',
                    grid: 'auto-flow / 5rem auto'
                }}
            >
                <div>Memory</div>
                <div>{hostInformation.memory}</div>
                <div>OS</div>
                <div>{hostInformation.os}</div>
            </div>
        </div>
    );
}

function renderModal(client: DDClient): void {
    ReactDOM.render(
        <React.StrictMode>
            <Modal client={client} />
        </React.StrictMode>,
        document.getElementById('root')
    );
}

export { renderModal };
