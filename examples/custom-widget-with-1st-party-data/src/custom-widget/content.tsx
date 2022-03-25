import React from 'react';
import { Monitor, MonitorProps } from './monitor';

/**
 * The different states the monitors can be in.
 */
export type ContentProps =
    | { type: 'loading' }
    | { type: 'error'; error: unknown }
    | { type: 'no monitors' }
    | { type: 'monitors'; props: MonitorProps[] };

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
                    {props.props.map(Monitor)}
                </table>
            );
    }
}
