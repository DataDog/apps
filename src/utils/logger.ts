/* eslint-disable no-console */
import type { DDClient } from '../client/client';

export class Logger {
    private readonly client: DDClient;

    constructor(client: DDClient) {
        this.client = client;
    }

    log(message: string) {
        if (this.client.debug) {
            return console.log(`dd-apps: ${message}`);
        }
    }

    error(message: string) {
        if (this.client.debug) {
            return console.error(`dd-apps: ${message}`);
        }
    }
}
