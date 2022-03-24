import React from 'react';
import { client } from '../client';

export type MonitorProps = {
    id: number;
    name: string;
};

/**
 * We simulate an asynchronous execution.
 * We could do anything at this point,
 * including interacting with 1st-party Datadog API or 3rd-party data.
 */
async function modifyMonitor(props: MonitorProps): Promise<void> {
    const result: boolean = await new Promise(
        (resolve: (result: boolean) => void): void => {
            setTimeout(() => {
                /**
                 * We simulate a 70% chance of being successful.
                 */
                resolve(Math.random() > 0.3);
            }, 1000);
        }
    );

    if (result) {
        await client.notification.send({
            label: `Modified monitor: ${props.name}`,
            level: 'success'
        });
        return;
    }

    await client.notification.send({
        label: `Could not modify monitor: ${props.name}`,
        level: 'warning'
    });
}

/**
 * This component renders the name of a monitor as a row in a table.
 *
 * It also renders a button for "modifying" the monitor.
 * This button can be used to do anything.
 * It's stubbed out to show how we might use it to provide behavior for Datadog monitors from an App.
 */
export function Monitor(props: MonitorProps): JSX.Element {
    return (
        <tr key={props.id}>
            <td>{props.name}</td>
            <td>
                <button onClick={() => modifyMonitor(props)} type="button">
                    Modify
                </button>
            </td>
        </tr>
    );
}
