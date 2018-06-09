export class Optional<T> {
    constructor(
        private value: T,
        public readonly defined: boolean
    ) {}

    static of<T>(value: T): Optional<T> {
        if (value === null || value === undefined) {
            return new Optional<T>(null, false)
        }
        return new Optional<T>(value, true)
    }

    get(): T {
        if (!this.defined) {
            throw 'Tried to access undefined Optional value.'
        }

        return this.value
    }

    getOrDefault(defaultValue: T): T {
        return this.defined ? this.value: defaultValue
    }

    getOrThrow(exception: any): T {
        if (!this.defined) {
            throw exception
        }

        return this.value
    }

    getOrNull(): T|null {
        return this.defined ? this.value: null
    }

    map<T2>(fn: (value: T) => T2): Optional<T|T2> {
        return this.defined ? Optional.of<T2>(fn(this.value)): this
    }

    to<T2>(fn: (value: T) => T2): T2 {
        return fn(this.value)
    }
}