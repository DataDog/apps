import {
    WidgetOptionItemType,
    init,
    EventType,
} from "@datadog/ui-extensions-sdk";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./widget.css";
import "./../index.css";
import "typeface-roboto";
import "milligram";

const client = init();

function Widget() {
    const [ breeds, setBreeds ] = useState([])
    const [ image, setImage ] = useState(null);

    useEffect(() => {
            fetch("http://localhost:3001/breeds")
                .then(res => res.json())
                .then(({ breeds }) => setBreeds(breeds))
                .catch(err => console.log('An error occurs on fetching breeds', err))
    }, [])

    useEffect(() => {
            if (breeds.length) {
                const options = breeds.map(breed => ({
                    label: breed['name'],
                    value: breed['id']
                }))

                client.dashboard.customWidget.updateOptions([
                    {
                        type: WidgetOptionItemType.STRING,
                        name: 'breed',
                        label: 'Select a Dog Breed so see Random Images of',
                        enum: options,
                        order: 1
                    }
                ])
            }
        },
    [breeds])

    useEffect(() => {
        client.events.on(
            EventType.DASHBOARD_CUSTOM_WIDGET_OPTIONS_CHANGE,
            () => console.log('===')
        )
    }, [])

    const cycleImage = async () => {}

    const getImage = async () => {}

    return (
        <div>
            <div className="button-wrapper">
                <button className="new-dog" onClick={() => console.log('click')}>
                    New Dog
                </button>
            </div>
            {
                image && (
                    <div className="image-wrapper">
                        <img src={image} alt="" />
                    </div>
                )
            }
        </div>
    )
}

export default function render() {
    ReactDOM.render(
        <React.StrictMode>
            <Widget />
        </React.StrictMode>,
        document.getElementById("root")
    );
}
