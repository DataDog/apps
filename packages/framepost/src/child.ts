import { MessageType } from './constants';
import { SharedClient, SharedClientOptions } from './shared';
import type { Message, Channel } from './types';

export interface ChildClientOptions extends SharedClientOptions {}
export class ChildClient<C = any> extends SharedClient<C> {
    constructor(options: ChildClientOptions) {
        super(options);
    }

    send<T = any>(eventType: string, data: T) {
        this.postMessage(MessageType.SEND_UP, eventType, data);
    }

    protected messageListener(event: MessageEvent<Message>) {
        switch (event.data.type) {
            case MessageType.CHANNEL_REQUEST: {
                this.establishChannel(event);
                break;
            }
            case MessageType.SEND_DOWN: {
                this.handleEvent(event);
            }
        }
    }

    protected establishChannel(event: MessageEvent<Message<C>>) {
        const channel: Channel = {
            source: event.source as Window,
            origin: event.origin,
            context: event.data.data
        };
        this.channel.resolve(channel);
        this.postMessage(MessageType.CHANNEL_CONFIRM, '', event.data);
    }
}
