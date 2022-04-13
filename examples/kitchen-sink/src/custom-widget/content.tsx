import React from 'react';
import { client } from '../client';
import { Monitor } from '../1st-party/monitor';

/**
 * The different states the monitors can be in.
 */
export type ContentProps =
    | { type: 'loading' }
    | { type: 'error'; error: unknown }
    | { type: 'no monitors' }
    | { type: 'monitors'; props: Monitor[] };

/**
 * We simulate an asynchronous execution.
 * We could do anything at this point,
 * including interacting with 1st-party Datadog API or 3rd-party data.
 */
async function modifyMonitor(props: Monitor): Promise<void> {
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
function MonitorComponent(props: Monitor): JSX.Element {
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

/**
 * This component renders the bulk of the custom widget.
 * Whatever the current state is, it renders it in a way that makes sense.
 */
export function Content(props: ContentProps): JSX.Element {
    switch (props.type) {
        case 'loading':
            return <>Loading…</>;

        case 'error':
            return (
                <>
                    Error loading monitors:
                    <pre>{JSON.stringify(props.error, null, 4)}</pre>
                </>
            );

        case 'no monitors':
            return <>No monitors</>;

        case 'monitors':
            return (
                <table style={{ borderCollapse: 'separate' }}>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    {props.props.map(MonitorComponent)}
                </table>
            );
    }
}
