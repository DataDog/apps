import { ProfileEventType } from './constants';
import type { MessageProfileEvent, Message } from './types';
export interface Profiler {
    logEvent(type: ProfileEventType, message: Message): void;
    getEvents(): MessageProfileEvent[];
}
export declare const getProfiler: (profile: boolean) => Profiler;
