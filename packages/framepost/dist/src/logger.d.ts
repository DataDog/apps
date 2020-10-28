export interface Logger {
    log(message: string): void;
    error(message: string): void;
}
export declare const getLogger: (prefix: string, debug: boolean) => Logger;
