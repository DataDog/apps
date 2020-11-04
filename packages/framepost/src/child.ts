import { ProfileEventType, REQUEST_KEY_GET_PROFILE } from './constants';
import { getLogger } from './logger';
import { SharedClient, SharedClientOptions } from './shared';
import type { Message } from './types';

export interface ChildClientOptions extends SharedClientOptions {
    context?: any;
}

export class ChildClient<C = any> extends SharedClient<C> {
    context: any;

    constructor(options: ChildClientOptions = {}) {
        super(options);

        this.context = options.context || null;

        this.initListener = this.initListener.bind(this);

        window.addEventListener('message', this.initListener);

        if (this.profile) {
            this.onRequest(REQUEST_KEY_GET_PROFILE, () =>
                this.profiler.getEvents()
            );
        }

        this.setInitTimer();
    }

    protected getLogger() {
        return getLogger('child-client', this.debug);
    }

    protected onChannelInit(ev: MessageEvent<Message<C>>) {
        window.removeEventListener('message', this.initListener);

        this.messagePort = ev.ports[0];

        const message = this.getInitMessage(this.context);

        this.messagePort.postMessage(message);

        this.profiler.logEvent(ProfileEventType.POST_MESSAGE, message);
    }

    destroy() {
        if (this.messagePort) {
            this.messagePort.close();
        }

        if (this.initTimer) {
            clearTimeout(this.initTimer);
        }

        window.removeEventListener('message', this.initListener);
    }
}
