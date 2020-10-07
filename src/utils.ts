export interface Deferred<T> {
    resolve: (t: T) => void
    reject: (t: T) => void
    promise: Promise<T>
}

/**
 * Creates a defferred object, including promise and resolve + reject methods to be executed later
 */
export const defer = <T>(): Deferred<T> => {
    let resolve: (t: T) => void;
    let reject: (t: T) => void;
    const promise = new Promise<T>((res, rej) => {
        resolve = res;
        reject = rej;
    })

    return {
        resolve,
        reject,
        promise,
    }
}

let increment: number = 0;

// generates an integer, guaranteed to be unique becuase it's incremented :)
export const uniqueInt = (): number => {
    increment = increment + 1;

    return increment;
}