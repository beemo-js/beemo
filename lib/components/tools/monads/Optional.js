/**
 * Monad to handle nullable values.
 */
export class Optional {
    constructor(value, defined) {
        this.value = value;
        this.defined = defined;
    }
    static of(value) {
        if (value === null || value === undefined) {
            return new Optional(null, false);
        }
        return new Optional(value, true);
    }
    get() {
        if (!this.defined) {
            throw 'Tried to access undefined Optional value.';
        }
        return this.value;
    }
    getOrDefault(defaultValue) {
        return this.defined ? this.value : defaultValue;
    }
    getOrThrow(exception) {
        if (!this.defined) {
            throw exception;
        }
        return this.value;
    }
    getOrNull() {
        return this.defined ? this.value : null;
    }
    map(fn) {
        return this.defined ? Optional.of(fn(this.value)) : this;
    }
    to(fn) {
        return fn(this.value);
    }
}
