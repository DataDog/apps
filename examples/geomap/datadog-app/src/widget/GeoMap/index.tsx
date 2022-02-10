import { useTemplateVariable } from '@datadog/ui-extensions-react';
import { Map, Marker } from 'pigeon-maps';
import { init } from '@datadog/ui-extensions-sdk';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import './widget.css';

const client = init();
const API_URL = process.env.REACT_APP_API_URL;

interface Location {
    latitude: string;
    longitude: string;
}

function Widget() {
    const [location, setLocation] = useState<Location | null>(null);
    const ipAddress = useTemplateVariable(client, 'IP');

    useEffect(() => {
        if (!ipAddress) return;

        fetch(`${API_URL}?ip=${ipAddress}`)
            .then(res => res.json())
            .then(({ geo: { latitude, longitude } }) =>
                setLocation({ latitude, longitude })
            )
            .catch(err => console.log(`An error occurs`, err));
    }, [ipAddress]);

    if (!location) return <div>Loading...</div>;

    const { latitude, longitude } = location;
    return (
        <div>
            <Map
                height={300}
                center={[Number(latitude), Number(longitude)]}
                defaultZoom={11}
            >
                <Marker
                    width={50}
                    anchor={[Number(latitude), Number(longitude)]}
                />
            </Map>
        </div>
    );
}

export default function render() {
    ReactDOM.render(
        <React.StrictMode>
            <Widget />
        </React.StrictMode>,
        document.getElementById('root')
    );
}
