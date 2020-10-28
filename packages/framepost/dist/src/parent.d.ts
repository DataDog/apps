import { SharedClient, SharedClientOptions } from './shared';
import type { Message, MessageProfile } from './types';
export interface ParentClientOptions extends SharedClientOptions {
}
export declare class ParentClient<C = any> extends SharedClient<C> {
    private frame?;
    private url?;
    constructor(options?: ParentClientOptions);
    /**
     * Request a channel with the child client. Must be called after child
     * frame is fully loaded.
     */
    requestChannel<T>(frame: HTMLIFrameElement, context: T): void;
    getMessageProfile(): Promise<MessageProfile[]>;
    protected establishChannel(event: MessageEvent<Message<C>>): void;
    protected getLogger(): import("./logger").Logger;
}
