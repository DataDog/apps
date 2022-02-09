import { useCustomWidgetOptions } from '@datadog/ui-extensions-react';
import { init, WidgetOptionItemType } from '@datadog/ui-extensions-sdk';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import './widget.css';
import './../index.css';
import 'typeface-roboto';
import 'milligram';

const client = init();

type WidgetOptions = {
    breed: string;
};

function Widget() {
    const [breeds, setBreeds] = useState([]);
    const [image, setImage] = useState(null);
    const options = useCustomWidgetOptions<WidgetOptions>(client);

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
        if (options.breed === undefined) {
            return;
        }

        getImage(options.breed);
    }, [options.breed]);

    const cycleImage = async () => {
        if (options.breed === undefined) {
            return;
        }

        getImage(options.breed);
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
