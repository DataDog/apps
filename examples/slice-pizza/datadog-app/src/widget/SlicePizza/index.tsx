import React, { useEffect, useState } from 'react';
import { init, ModalSize } from '@datadog/ui-extensions-sdk';
import ReactDOM from 'react-dom';

const client = init();

function Widget() {
    const onOpenModal = () => {
        client.modal.open({
            key: 'slice-pizza-modal',
            source: 'slice-pizza-modal',
            size: ModalSize.LARGE
        });
    };

    return (
        <div>
            <h1>Pizza Slices</h1>
            <button onClick={onOpenModal}>Order a pizza</button>
        </div>
    );
}

export default function render() {
    ReactDOM.render(
        <React.StrictMode>{<Widget />}</React.StrictMode>,
        document.getElementById('root')
    );
}
