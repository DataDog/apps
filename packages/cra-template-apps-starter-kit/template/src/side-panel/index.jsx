import { useContext } from '@datadog/ui-extensions-react';
import { init } from '@datadog/ui-extensions-sdk';
import ReactDOM from 'react-dom';
import React from 'react';

const client = init();

function SidePanel() {
    const context = useContext(client);

    const args = context?.args;

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <p>This side panel was opened programatically with these args </p>
            <blockquote style={{ backgroundColor: '#333', color: '#fff' }}>
                <p>
                    <em>{JSON.stringify(args)}</em>
                </p>
            </blockquote>
        </div>
    );
}

export default function render() {
    ReactDOM.render(
        <React.StrictMode>{<SidePanel />}</React.StrictMode>,
        document.getElementById('root')
    );
}
