/* eslint-disable no-console */
import type { DDClient } from '../client/client';

export class Logger {
    private readonly client: DDClient;

    constructor(client: DDClient) {
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
