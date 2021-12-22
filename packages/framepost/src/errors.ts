/**
 * Typed errors allow consumer to distinguish failure cases
 */

export class HandshakeTimeoutError extends Error {
    constructor() {
        super('Handshake timed out');

        this.name = 'HandshakeTimeoutError';
    }
}

export class RequestTimeoutError extends Error {
    constructor() {
        super('Request timed out');

        this.name = 'RequestTimeoutError';
    }
}
