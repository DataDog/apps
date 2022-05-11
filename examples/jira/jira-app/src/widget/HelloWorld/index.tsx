import { useContext } from '@datadog/ui-extensions-react';
import { init, EventType } from '@datadog/ui-extensions-sdk';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';


const client = init()
const PROXY_URL = process.env.REACT_APP_PROXY_URL 


function Widget() {
    return (
        <h1>Hello, World</h1>
    )
}

export default function render() {
    ReactDOM.render(
        <React.StrictMode>{<Widget />}</React.StrictMode>,
        document.getElementById('root')
    );
}
