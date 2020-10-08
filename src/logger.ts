/* eslint-disable no-console */
import { ClientOptions } from './types';

export interface Logger {
    log(message: string): void;
    error(message: string): void;
}

export const getLogger = (options: ClientOptions): Logger => {
    if (options.debug) {
        return {
            log(message: string) {
                return console.log(`dd-apps: ${message}`);
            },
            error(message: string) {
                return console.error(`dd-apps: ${message}`);
            }
        };
    } else {
        return {
            log() {},
            error() {}
        };
    }
};
