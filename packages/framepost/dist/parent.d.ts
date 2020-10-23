import { SharedClient, SharedClientOptions } from './shared';
import type { Message, TransactionProfile } from './types';
export interface ParentClientOptions extends SharedClientOptions {
}
export declare class ParentClient<C = any> extends SharedClient<C> {
    private frame?;
    private url?;
    constructor(options: ParentClientOptions);
    requestChannel<T>(frame: HTMLIFrameElement, url: string, context: T): void;
    getProfile(): Promise<TransactionProfile[]>;
    protected establishChannel(event: MessageEvent<Message<C>>): void;
    protected getLogger(): import("./logger").Logger;
}
