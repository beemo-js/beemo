/**
 * Monad to pipe value through a list of functions.
 */
export class Pipe<T> {
    constructor(
        private value: T
    ) {}

    static of<T>(value: T): Pipe<T> {
        return new Pipe<T>(value)
    }

    get(): T {
        return this.value
    }

    map<T2>(fn: (value: T) => T2): Pipe<T2> {
        return Pipe.of(fn(this.value))
    }

    to<T2>(fn: (value: T) => T2): T2 {
        return fn(this.value)
    }
}
