import { ProfileEventType } from './constants';
import type { ProfileEvent, Message } from './types';

export interface Profiler {
    logEvent(type: ProfileEventType, message: Message): void;
    getEvents(): ProfileEvent[];
}

export const getProfiler = (profile: boolean): Profiler => {
    const events: ProfileEvent[] = [];

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
