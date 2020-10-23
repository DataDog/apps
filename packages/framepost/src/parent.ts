import { MessageType } from './constants';
import { SharedClient, SharedClientOptions } from './shared';
import type { Message, Channel } from './types';
import { randomInsecureId } from './utils';

export interface ParentClientOptions extends SharedClientOptions {}

export class ParentClient<C = any> extends SharedClient<C> {
    private tempChannelData?: Channel;

    constructor(options: ParentClientOptions) {
        super(options);
    }

    send<T = any>(eventType: string, data: T) {
        this.postMessage(MessageType.SEND_DOWN, eventType, data);
    }

    requestChannel(frame: HTMLIFrameElement, url: string, context: C) {
        const { origin } = new URL(url);

        if (frame.contentWindow) {
            this.tempChannelData = {
                source: frame.contentWindow,
                origin,
                context
            };

            const message: Message = {
                type: MessageType.CHANNEL_REQUEST,
                eventType: '',
                data: context,
                id: randomInsecureId()
            };

            frame.contentWindow.postMessage(message, origin);
        } else {
            this.channel.reject(event);
        }
    }

    protected messageListener(event: MessageEvent<Message>) {
        switch (event.data.type) {
            case MessageType.CHANNEL_CONFIRM: {
                return this.establishChannel(event);
            }
            case MessageType.SEND_UP: {
                this.handleEvent(event);
            }
        }
    }

    private establishChannel(event: MessageEvent<Message<C>>) {
        if (event.source === this.tempChannelData!.source) {
            this.channel.resolve(this.tempChannelData!);
        } else {
            this.channel.reject(event);
        }
    }
}
