import {
    ProfileEventType,
    TransactionDirection,
    REQUEST_KEY_GET_PROFILE,
    SerializationType
} from './constants';
import { HandshakeTimeoutError, RequestTimeoutError } from './errors';
import type {
    Deferred,
    Message,
    MessageProfileEvent,
    MessageProfile,
    SerializedError
} from './types';

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

    return transactions
        .filter(item => item.message.key !== REQUEST_KEY_GET_PROFILE)
        .sort((a, b) => a.postTime.getTime() - b.postTime.getTime());
};

const serializeError = (error: Error): SerializedError => {
    return {
        message: error.message,
        name: error.name,
        stack: error.stack
    };
};

const deserializeError = ({ name, message, stack }: SerializedError): Error => {
    switch (name) {
        case HandshakeTimeoutError.name: {
            return new HandshakeTimeoutError();
        }
        case RequestTimeoutError.name: {
            return new RequestTimeoutError();
        }
        default: {
            const e = new Error(message);
            e.name = name;
            e.stack = stack;
            return e;
        }
    }
};

export const serialize = (message: Omit<Message, 'serialization'>): Message => {
    let data = message.data;
    let serialization = SerializationType.NONE;

    if (data instanceof Error) {
        serialization = SerializationType.ERROR;
        data = serializeError(data);
    }

    return {
        ...message,
        serialization,
        data
    };
};

export const deserialize = (message: Message): Message => {
    if (message.serialization === SerializationType.ERROR) {
        return {
            ...message,
            data: deserializeError(message.data)
        };
    }

    return message;
};
