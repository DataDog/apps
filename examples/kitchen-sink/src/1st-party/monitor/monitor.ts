export type Monitor = {
    id: number;
    name: string;
};

function isRecord(args: unknown): args is Record<string, unknown> {
    return (
        typeof args === 'object' && args != null && args.constructor === Object
    );
}

function parseMonitor(monitor: unknown): Monitor | undefined {
    if (!isRecord(monitor)) {
        return;
    }
    if (typeof monitor.id !== 'number') {
        return;
    }
    if (typeof monitor.name !== 'string') {
        return;
    }

    return {
        id: monitor.id,
        name: monitor.name
    };
}

/**
 * We do a bit of work to make sure that the API response we get back is the correct shape.
 *
 * @param response The API response from the SDK.
 * @returns The parsed {@link Monitor}.
 */
export function parseMonitors(response: unknown): Monitor[] {
    if (!Array.isArray(response)) {
        return [];
    }

    return response
        .map(parseMonitor)
        .filter((monitor?: Monitor): monitor is Monitor => {
            return monitor != null;
        });
}
