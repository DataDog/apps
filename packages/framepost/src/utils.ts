import { ProfileEventType, TransactionDirection } from './constants';
import type { Deferred, MessageProfileEvent, MessageProfile } from './types';

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

export const omit = (object: any, key: string): any => {
    const { [key]: _, ...rest } = object;

    return rest;
};

const keyBy = <T>(
    items: T[],
    getId: (item: T) => string
): { [key: string]: T } => {
    const out: { [key: string]: T } = {};

    items.forEach(item => {
        out[getId(item)] = item;
    });

    return out;
};

export const profileMessages = (
    parentEvents: MessageProfileEvent[],
    childEvents: MessageProfileEvent[]
): MessageProfile[] => {
    const allEvents = parentEvents.concat(childEvents);
    const receiveEvents = allEvents.filter(
        item => item.type === ProfileEventType.RECEIVE_MESSAGE
    );
    const receiveEventsByMessageID = keyBy(
        receiveEvents,
        item => item.message.id
    );

    const transactions: MessageProfile[] = [];

    const getBaseTransaction = ({
        date,
        message
    }: MessageProfileEvent): MessageProfile => {
        const transaction: MessageProfile = {
            id: message.id,
            direction: TransactionDirection.DOWN,
            postTime: date,
            message
        };

        const receiveEvent = receiveEventsByMessageID[message.id];

        if (receiveEvent) {
            transaction.receiveTime = receiveEvent.date;
            transaction.duration =
                (receiveEvent.date.getTime() - date.getTime()) / 1000;
        }

        return transaction;
    };

    parentEvents
        .filter(item => item.type === ProfileEventType.POST_MESSAGE)
        .forEach(ev => {
            const transaction = getBaseTransaction(ev);

            transactions.push(transaction);
        });

    childEvents
        .filter(item => item.type === ProfileEventType.POST_MESSAGE)
        .forEach(ev => {
            const transaction = getBaseTransaction(ev);

            transaction.direction = TransactionDirection.UP;

            transactions.push(transaction);
        });

    return transactions.sort(
        (a, b) => a.postTime.getTime() - b.postTime.getTime()
    );
};
