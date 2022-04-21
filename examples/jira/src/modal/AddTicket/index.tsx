import { useContext } from '@datadog/ui-extensions-react';
import { init } from '@datadog/ui-extensions-sdk';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const client = init();


function Modal() {
    return (
        <h1>Add Ticket</h1>
    )
}

export default function render() {
    ReactDOM.render(
        <React.StrictMode>{<Modal />}</React.StrictMode>,
        document.getElementById('root')
    );
}
