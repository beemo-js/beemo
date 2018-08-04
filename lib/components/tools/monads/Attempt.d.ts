/**
 * Monad to handle exceptions.
 */
export declare class Attempt<T> {
    private value;
    private exception;
    readonly succeeded: boolean;
    constructor(value: T, exception: any, succeeded: boolean);
    static of<T>(fn: () => T): Attempt<T>;
    get(): T;
    getOrDefault(defaultValue: T): T;
    getOrElse(fn: Function): T | null;
    getOrThrow(exception: any): T;
    map<T2>(fn: (value: T) => T2): Attempt<T | T2>;
    recover(fn: (exception: any) => void): this;
    to<T2>(fn: (value: T) => T2): T2;
    ignoreFail(): this;
}
