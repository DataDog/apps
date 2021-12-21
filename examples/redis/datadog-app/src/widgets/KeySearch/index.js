import { init } from '@datadog/ui-extensions-sdk'
import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'

const client = init()

const API_URL = process.env.REACT_APP_API_URL

const Widget = () => {
    const onOpenModal = () => {
        client.modal.open({
            key: 'search-key-modal',
            source: 'keys-search-modal',
            size: 'md'
        })
    }

    return (
        <div>
            <button onClick={onOpenModal}>Search a key</button>
        </div>
    )
}

export default function render() {
    ReactDOM.render(
        <React.StrictMode>
            <Widget />
        </React.StrictMode>,
        document.getElementById('root')
    )
}

