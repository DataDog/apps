/**
 * The {@link Host} is the 3rd-party data we're integrating with.
 * The idea is that it represents any data that some 3rd-party provides that is being displayed.
 */
type HostInformation = {
    memory: string;
    name: string;
    os: string;
};

/**
 * This function represent the idea of retrieving 3rd-party data.
 * It currently stubs out {@link HostInformation} just to provide something.
 *
 * @param name The host to find {@link HostInformation} for.
 * @returns The {@link HostInformation}, if it exists.
 */
async function getHostInformation(
    name: string
): Promise<HostInformation | undefined> {
    /**
     * Simulate making a request to a 3rd-party that returns the {@link HostInformation}s.
     */
    return new Promise(
        (resolve: (information?: HostInformation) => void): void => {
            setTimeout((): void => {
                /**
                 * Resolve with nothing if the 3rd-party doesn't have information for the host.
                 */
                const response: unknown =
                    name === 'some non-existent host'
                        ? undefined
                        : {
                              memory: '32GB',
                              os: 'linux',
                              name
                          };

                resolve(parseHostInformation(response));
            }, 100);
        }
    );
}

function isRecord(args: unknown): args is Record<string, unknown> {
    return (
        typeof args === 'object' && args != null && args.constructor === Object
    );
}

function isString(arg: unknown): arg is string {
    return typeof arg === 'string';
}

/**
 * We provide a helper for attempting to parse some arbitrary data into a {@link HostInformation} if possible.
 *
 * @param args The arbitrary data to parse.
 * @returns If {@link args} was parseable as {@link HostInformation}, returns it.
 */
function parseHostInformation(args: unknown): HostInformation | undefined {
    if (!isRecord(args)) {
        return;
    }

    if (!isString(args.memory)) {
        return;
    }

    if (!isString(args.name)) {
        return;
    }

    if (!isString(args.os)) {
        return;
    }

    return {
        name: args.name,
        memory: args.memory,
        os: args.os
    };
}

export { getHostInformation, parseHostInformation };
export type { HostInformation };
