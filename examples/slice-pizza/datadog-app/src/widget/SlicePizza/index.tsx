import React from 'react';
import ReactDOM from 'react-dom';
import { init, ModalSize } from '@datadog/ui-extensions-sdk';

// eslint-disable-next-line
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
        <div className="sp-app-widget">
            <button className="sp-app-widget__btn" onClick={onOpenModal}>
                Order pizza
            </button>
        </div>
    );
}

export default function render() {
    ReactDOM.render(
        <React.StrictMode>{<Widget />}</React.StrictMode>,
        document.getElementById('root')
    );
}
