import { useContext } from '@datadog/ui-extensions-react';
import { init } from '@datadog/ui-extensions-sdk';
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

const client = init();

const SidePanel = () => {
    const context = useContext(client);

    if (context === undefined) return <div>Loading...</div>;

    const redisMetric = context.args.redisData;

    return (
        <div>
            Redis Data:
            <ul>
                <li>Key: {redisMetric.key}</li>
                <li>Value: {redisMetric.value}</li>
            </ul>
        </div>
    );
};

export default function render() {
    ReactDOM.render(
        <React.StrictMode>
            <SidePanel />
        </React.StrictMode>,
        document.getElementById('root')
    );
}
