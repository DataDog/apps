import { ProfileEventType } from './constants';
import type { ProfileEvent, Message } from './types';
export interface Profiler {
    logEvent(type: ProfileEventType, message: Message): void;
    getEvents(): ProfileEvent[];
}
export declare const getProfiler: (profile: boolean) => Profiler;
