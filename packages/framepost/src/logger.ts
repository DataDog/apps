/* eslint-disable no-console */
export interface Logger {
    log(message: string): void;
    error(message: string): void;
}

export const getLogger = (prefix: string, debug: boolean): Logger => {
    if (debug) {
        return {
            log(message: string) {
                return console.log(`${prefix}: ${message}`);
            },
            error(message: string) {
                return console.error(`${prefix}: ${message}`);
            }
        };
    } else {
        return {
            log() {},
            error() {}
        };
    }
};
