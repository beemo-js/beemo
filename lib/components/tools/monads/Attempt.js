/**
 * Monad to handle exceptions.
 */
export class Attempt {
    constructor(value, exception, succeeded) {
        this.value = value;
        this.exception = exception;
        this.succeeded = succeeded;
    }
    static of(fn) {
        try {
            return new Attempt(fn(), null, true);
        }
        catch (e) {
            return new Attempt(null, e, false);
        }
    }
    get() {
        if (!this.succeeded) {
            throw this.exception;
        }
        return this.value;
    }
    getOrDefault(defaultValue) {
        return this.succeeded ? this.value : defaultValue;
    }
    getOrElse(fn) {
        if (this.succeeded) {
            return this.value;
        }
        fn(this.exception);
        return null;
    }
    getOrThrow(exception) {
        if (!this.succeeded) {
            throw exception;
        }
        return this.value;
    }
    map(fn) {
        return this.succeeded ? Attempt.of(() => fn(this.value)) : this;
    }
    recover(fn) {
        if (!this.succeeded) {
            fn(this.exception);
        }
        return this;
    }
    to(fn) {
        return fn(this.value);
    }
    ignoreFail() {
        return this;
    }
}
