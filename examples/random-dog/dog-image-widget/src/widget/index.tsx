import { useContext } from '@datadog/ui-extensions-react';
import { EventType, init } from '@datadog/ui-extensions-sdk';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import './widget.css';
import './../index.css';
import 'typeface-roboto';
import 'milligram';

const client = init();

function Widget() {
    const [image, setImage] = useState(null);
    const context = useContext(client);

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
        if (context === undefined) {
            return;
        }

        const breed = context.widget?.definition.options?.breed;
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
