/**
 * Monad to handle nullable values.
 */
export declare class Optional<T> {
    private value;
    readonly defined: boolean;
    constructor(value: T, defined: boolean);
    static of<T>(value: T): Optional<T>;
    get(): T;
    getOrDefault(defaultValue: T): T;
    getOrThrow(exception: any): T;
    getOrNull(): T | null;
    map<T2>(fn: (value: T) => T2): Optional<T | T2>;
    to<T2>(fn: (value: T) => T2): T2;
}
