import { Map, Marker } from 'pigeon-maps'
import { init, EventType, TemplateVariableValue } from '@datadog/ui-extensions-sdk';
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

    const [ip, setIp] = useState<string[] | []>([])

    useEffect(() => {
        if (!ip.length) return
        
        const [ipAddress] = ip
        fetch(`${API_URL}?ip=${ipAddress}`)
            .then(res => res.json())
            .then(({ geo: { latitude, longitude } }) => setLocation({latitude, longitude}))
            .catch(err => console.log(`An error occurs`, err))
    }, [ip])

    useEffect(() => {
        client.getContext()
            //.then(context => console.log(context.dashboard?.templateVars))
            .then(({ dashboard }) => handleTemplateVariables(dashboard?.templateVars))
    }, [])

    useEffect(() => {
        client.events.on(EventType.CONTEXT_CHANGE, ({ dashboard }) => {
           handleTemplateVariables(dashboard?.templateVars) 
        });
    }, [])


    const handleTemplateVariables = (templateVariables: undefined | TemplateVariableValue[]) => {
        if (templateVariables === undefined || !templateVariables.length) return

        const newIp = templateVariables
            .filter(variable => variable.name === 'IP')
            .map(variable => variable.value)

        setIp(newIp)
    }


    if (!location) return <div>Loading...</div>

    const { latitude, longitude } = location
    return (
        <div>
            <Map height={300} center={[Number(latitude), Number(longitude)]} defaultZoom={11}>
                <Marker width={50} anchor={[Number(latitude), Number(longitude)]} />
            </Map>
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

