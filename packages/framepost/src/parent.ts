import { MessageType } from './constants';
import { getLogger } from './logger';
import { SharedClient, SharedClientOptions } from './shared';
import type { Message, Channel } from './types';
import { randomInsecureId } from './utils';

export interface ParentClientOptions extends SharedClientOptions {}

export class ParentClient<C = any> extends SharedClient<C> {
    private frame?: HTMLIFrameElement;
    private url?: URL;

    constructor(options: ParentClientOptions) {
        super(options);
    }

    requestChannel<T>(frame: HTMLIFrameElement, url: string, context: T) {
        this.frame = frame;
        this.url = new URL(url);

        if (frame.contentWindow) {
            const message: Message = {
                type: MessageType.CHANNEL_INIT,
                eventType: '',
                data: context,
                id: randomInsecureId()
            };

            frame.contentWindow.postMessage(message, this.url.origin);
        }
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
