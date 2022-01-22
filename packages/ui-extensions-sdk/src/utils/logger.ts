/* eslint-disable no-console */
import { DebugClient } from '../types';

export class Logger {
    private readonly client: DebugClient;

    constructor(client: DebugClient) {
        this.client = client;
    }

    private getPrefix(): string {
        return `dd-apps@${window.location.href}: `; // eslint-disable-line
    }

    // TODO: would be nice to prefix with some info about the app
    log(message: string) {
        if (this.client.debug) {
            return console.log(`${this.getPrefix()}${message}`);
        }
    }

    error(message: string) {
        if (this.client.debug) {
            return console.error(`${this.getPrefix()}${message}`);
        }
    }
}
