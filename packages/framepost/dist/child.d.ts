import { SharedClient, SharedClientOptions } from './shared';
import type { Message } from './types';
export interface ChildClientOptions extends SharedClientOptions {
    parentContext?: any;
}
export declare class ChildClient<C = any> extends SharedClient<C> {
    parentContext: any;
    constructor(options: ChildClientOptions);
    protected getLogger(): import("./logger").Logger;
    protected establishChannel(event: MessageEvent<Message<C>>): void;
}
