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

interface Account {
    value: string;
    name: string;
}


function Widget() {
    const [location, setLocation] = useState<Location | null>(null);

    // Example use of template variables
    const [accountsId, setAccountsId] = useState<Account[] | null>(null)

    useEffect(() => {
        fetch(`${API_URL}?ip=8.8.8.8`)
            .then(res => res.json())
            .then(({ geo: { latitude, longitude } }) => setLocation({latitude, longitude}))
            .catch(err => console.log(`An error occurs`, err))
    }, [])

    useEffect(() => {
        client.getContext()
            //.then(context => console.log(context.dashboard?.templateVars))
            .then(({ dashboard }) => handleTemplateVariables(dashboard?.templateVars))
    }, [])

    useEffect(() => {
        client.events.on(EventType.CONTEXT_CHANGE, (newContext) => {
            console.log(newContext)
        });
    }, [])


    const handleTemplateVariables = (templateVariables: undefined | TemplateVariableValue[]) => {
        if (templateVariables === undefined || !templateVariables.length) return

        const newAccountsId = templateVariables
            .filter(variable => variable.name === 'account_id')
            .map(variable => ({ value: variable.value, name: variable.name }))

        setAccountsId(newAccountsId)
    }


    if (!location) return <div>Loading...</div>

    /*
    console.log('=======')
    console.log(location)
    console.log('=======')
    */

    const { latitude, longitude } = location

    return (
        <div>
            <Map height={300} defaultCenter={[Number(latitude), Number(longitude)]} defaultZoom={11}>
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

