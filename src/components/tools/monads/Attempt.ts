/**
 * Monad to handle exceptions.
 */
export class Attempt<T> {
    constructor(
        private value: T,
        private exception: any,
        public readonly succeeded: boolean
    ) {}

    static of<T>(fn: () => T): Attempt<T> {
        try {
            return new Attempt<T>(fn(), null, true)
        } catch (e) {
            return new Attempt<T>(null, e, false)
        }
    }

    get(): T {
        if (!this.succeeded) {
            throw this.exception
        }

        return this.value
    }

    getOrDefault(defaultValue: T): T {
        return this.succeeded ? this.value: defaultValue
    }

    getOrElse(fn: Function): T|null {
        if (this.succeeded) {
            return this.value
        }

        fn(this.exception)
        return null
    }

    getOrThrow(exception: any): T {
        if (!this.succeeded) {
            throw exception
        }

        return this.value
    }

    map<T2>(fn: (value: T) => T2): Attempt<T|T2> {
        return this.succeeded ? Attempt.of(() => fn(this.value)): this
    }

    recover(fn: (exception: any) => void): this {
        if (!this.succeeded) {
            fn(this.exception)
        }

        return this
    }

    to<T2>(fn: (value: T) => T2): T2 {
        return fn(this.value)
    }

    ignoreFail(): this {
        return this
    }
}
