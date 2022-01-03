import { init } from '@datadog/ui-extensions-sdk';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import './widget.css';

const client = init();
const API_URL = process.env.REACT_APP_API_URL

interface Location {
    latitude: string;
    longitude: string;
}

function Widget() {
    const [location, setLocation] = useState<Location | null>(null);

    useEffect(() => {
        fetch(`${API_URL}`)
            .then(res => res.json())
            .then(({ geo: { latitude, longitude } }) => setLocation({latitude, longitude}))
            .catch(err => console.log(`An error occurs`, err))
    }, [])

    console.log('========')
    console.log(location)
    console.log('========')

    return (
        <div>
            <h1>Hello</h1>
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

