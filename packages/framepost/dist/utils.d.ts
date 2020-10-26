import type { Deferred, MessageProfileEvent, MessageProfile } from './types';
export declare const defer: <T>() => Deferred<T>;
export declare const randomInsecureId: (len?: number) => string;
export declare const omit: (object: any, key: string) => any;
export declare const profileMessages: (parentEvents: MessageProfileEvent[], childEvents: MessageProfileEvent[]) => MessageProfile[];
