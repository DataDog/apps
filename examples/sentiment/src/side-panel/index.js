import { init } from '@datadog/ui-extensions-sdk';
import { useState, useEffect } from 'react';
import './../index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import 'milligram';

import Sentiment from './Sentiment';

const client = init();

function SidePanel() {
    const [args, setArgs] = useState();

    let sentimentTweet;

    useEffect(() => {
        client.getContext().then(({ args }) => setArgs(args.args));
    }, [setArgs]);

    if (args !== undefined) {
        sentimentTweet = args;
    }

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
