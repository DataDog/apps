/**
 * Typed errors allow consumer to distinguish failure cases
 */

export class HandshakeTimeoutError extends Error {
    constructor() {
        super('Handshake timed out');

        /**
         * Because we are targeting es5 in complilation, instanceOf checks won't work
         * with the resulting error types. See https://www.dannyguo.com/blog/how-to-fix-instanceof-not-working-for-custom-errors-in-typescript/
         * TODO: Can we upgrade the compilation target? What do we need to support in iframes?
         */
        Object.setPrototypeOf(this, HandshakeTimeoutError.prototype);

        this.name = 'HandshakeTimeoutError';
    }
}

export class RequestTimeoutError extends Error {
    constructor() {
        super('Request timed out');

        Object.setPrototypeOf(this, RequestTimeoutError.prototype);

        this.name = 'RequestTimeoutError';
    }
}

export class ClientDestroyedError extends Error {
    constructor() {
        super('Client destroyed');

        Object.setPrototypeOf(this, ClientDestroyedError.prototype);

        this.name = 'ClientDestroyedError';
    }
}
