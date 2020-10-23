import type { Deferred } from './types';

export const defer = <T>(): Deferred<T> => {
    let resolve: (t: T) => void = () => {};
    let reject: (e?: any) => void = () => {};
    const promise = new Promise<T>((res, rej) => {
        resolve = res;
        reject = rej;
    });

    return {
        resolve,
        reject,
        promise
    };
};

/* eslint-disable no-bitwise */
export const randomInsecureId = (len: number = 16): string =>
    [...Array(len)].map(() => (~~(Math.random() * 36)).toString(36)).join('');
/* eslint-enable */
