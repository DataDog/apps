import { useContext } from '@datadog/ui-extensions-react';
import { init } from '@datadog/ui-extensions-sdk';
import './../index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import 'milligram';

import Sentiment from './Sentiment';

const client = init();

function SidePanel() {
    const result = useContext(client);
    const sentimentTweet =
        result.type === 'initialized' ? result.context.args.args : undefined;

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            {sentimentTweet ? (
                <Sentiment tweets={sentimentTweet}></Sentiment>
            ) : null}
        </div>
    );
}

export default function render() {
    ReactDOM.render(
        <React.StrictMode>{<SidePanel />}</React.StrictMode>,
        document.getElementById('root')
    );
}
