import {
    MessageType,
    ProfileEventType,
    REQUEST_KEY_GET_PROFILE,
    MessageAPIVersion
} from './constants';
import { getLogger } from './logger';
import { SharedClient, SharedClientOptions } from './shared';
import type {
    Message,
    Channel,
    MessageProfileEvent,
    MessageProfile
} from './types';
import { randomInsecureId, profileMessages } from './utils';

export interface ParentClientOptions extends SharedClientOptions {}

export class ParentClient<C = any> extends SharedClient<C> {
    private frame?: HTMLIFrameElement;
    private url?: URL;

    constructor(options: ParentClientOptions) {
        super(options);
    }

    /**
     * Request a channel with the child client. Must be called after child
     * frame is fully loaded.
     */
    requestChannel<T>(frame: HTMLIFrameElement, context: T) {
        this.frame = frame;
        this.url = new URL(frame.src);

        if (frame.contentWindow) {
            const message: Message = {
                type: MessageType.CHANNEL_INIT,
                apiVersion: MessageAPIVersion.v1,
                key: '',
                data: context,
                id: randomInsecureId()
            };

            frame.contentWindow.postMessage(message, this.url.origin);

            this.profiler.logEvent(ProfileEventType.POST_MESSAGE, message);
        }
    }

    async getMessageProfile(): Promise<MessageProfile[]> {
        const childEvents = await this.request<any, MessageProfileEvent[]>(
            REQUEST_KEY_GET_PROFILE
        );
        const events = this.profiler.getEvents();

        return profileMessages(events, childEvents);
    }

    protected establishChannel(event: MessageEvent<Message<C>>) {
        if (this.frame && event.source === this.frame.contentWindow) {
            const channel: Channel<C> = {
                source: event.source as Window,
                origin: event.origin,
                context: event.data.data
            };

            this.channel.resolve(channel);
        }
    }

    protected getLogger() {
        return getLogger('parent-client', this.debug);
    }
}
