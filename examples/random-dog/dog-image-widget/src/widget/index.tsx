import {
    WidgetOptionItemType,
    init,
    EventType
} from '@datadog/ui-extensions-sdk';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import './widget.css';
import './../index.css';
import 'typeface-roboto';
import 'milligram';

const client = init();

function Widget() {
    const [breeds, setBreeds] = useState([]);
    const [image, setImage] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3001/breeds')
            .then(res => res.json())
            .then(({ breeds }) => setBreeds(breeds))
            .catch(err =>
                console.log('An error occurs on fetching breeds', err)
            );
    }, []);

    useEffect(() => {
        if (breeds.length) {
            const options = [
                {
                    label: 'All Breeds',
                    value: '0'
                }
            ].concat(
                breeds.map(breed => ({
                    label: breed['name'] as string,
                    value: breed['id'] as string
                }))
            );

            client.dashboard.customWidget.updateOptions([
                {
                    type: WidgetOptionItemType.STRING,
                    name: 'breed',
                    label: 'Select a Dog Breed to get Random Images of',
                    enum: options,
                    order: 1
                }
            ]);
        }
    }, [breeds]);

    useEffect(() => {
        client.events.on(
            EventType.DASHBOARD_CUSTOM_WIDGET_OPTIONS_CHANGE,
            ({ breed }) => {
                if (breed !== undefined) {
                    getImage(breed.toString());
                }
            }
        );
    }, []);

    const cycleImage = async () => {
        const breed = await client
            .getContext()
            .then(c => c.widget?.definition.options?.breed);
        getImage(breed);
    };

    const getImage = (breed: string) =>
        fetch(`http://localhost:3001/image?breed_id=${breed}`)
            .then(res => res.json())
            .then(({ imageUrl }) => setImage(imageUrl))
            .catch(err =>
                console.log('An error occurs when fetching breed', err)
            );

    return (
        <div className="main-wrapper">
            <button className="new-dog-btn" onClick={cycleImage}>
                New Dog
            </button>
            {image && (
                <div className="image-wrapper">
                    <img className="dog-img" src={image} alt="" />
                </div>
            )}
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
