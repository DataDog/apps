import type { Deferred, ProfileEvent, TransactionProfile } from './types';
export declare const defer: <T>() => Deferred<T>;
export declare const randomInsecureId: (len?: number) => string;
export declare const profileTransactions: (parentEvents: ProfileEvent[], childEvents: ProfileEvent[]) => TransactionProfile[];
