import { SharedClient, SharedClientOptions } from './shared';
import type { Message } from './types';
export interface ChildClientOptions extends SharedClientOptions {
    context?: any;
}
export declare class ChildClient<C = any> extends SharedClient<C> {
    context: any;
    constructor(options?: ChildClientOptions);
    protected getLogger(): import("./logger").Logger;
    protected onChannelInit(ev: MessageEvent<Message<C>>): void;
    destroy(): void;
}
