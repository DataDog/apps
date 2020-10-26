import { ProfileEventType } from './constants';
import type { MessageProfileEvent, Message } from './types';

export interface Profiler {
    logEvent(type: ProfileEventType, message: Message): void;
    getEvents(): MessageProfileEvent[];
}

export const getProfiler = (profile: boolean): Profiler => {
    const events: MessageProfileEvent[] = [];

    return {
        logEvent(type: ProfileEventType, message: Message) {
            if (profile) {
                events.push({
                    type,
                    message,
                    date: new Date()
                });
            }
        },
        getEvents() {
            return events;
        }
    };
};
