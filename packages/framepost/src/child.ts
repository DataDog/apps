import { MessageType } from './constants';
import { getLogger } from './logger';
import { SharedClient, SharedClientOptions } from './shared';
import type { Message, Channel } from './types';

export interface ChildClientOptions extends SharedClientOptions {
    parentContext: any;
}
export class ChildClient<C = any> extends SharedClient<C> {
    parentContext: any;

    constructor(options: ChildClientOptions) {
        super(options);

        this.parentContext = options.parentContext || null;
    }

    protected getLogger() {
        return getLogger('child-client', this.debug);
    }

    protected establishChannel(event: MessageEvent<Message<C>>) {
        const channel: Channel = {
            source: event.source as Window,
            origin: event.origin,
            context: event.data.data
        };
        this.channel.resolve(channel);
        this.postMessage(MessageType.CHANNEL_INIT, '', this.parentContext);
    }
}
