import { MessageType, REQUEST_KEY_GET_PROFILE } from './constants';
import { getLogger } from './logger';
import { SharedClient, SharedClientOptions } from './shared';
import type { Message, Channel } from './types';

export interface ChildClientOptions extends SharedClientOptions {
    parentContext?: any;
}

export class ChildClient<C = any> extends SharedClient<C> {
    parentContext: any;

    constructor(options: ChildClientOptions = {}) {
        super(options);

        this.parentContext = options.parentContext || null;

        if (this.profile) {
            this.onRequest(REQUEST_KEY_GET_PROFILE, () =>
                this.profiler.getEvents()
            );
        }
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
