/**
 * Monad to pipe value through a list of functions.
 */
export declare class Pipe<T> {
    private value;
    constructor(value: T);
    static of<T>(value: T): Pipe<T>;
    get(): T;
    map<T2>(fn: (value: T) => T2): Pipe<T2>;
    to<T2>(fn: (value: T) => T2): T2;
}
