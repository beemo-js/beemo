/**
 * Monad to pipe value through a list of functions.
 */
export class Pipe {
    constructor(value) {
        this.value = value;
    }
    static of(value) {
        return new Pipe(value);
    }
    get() {
        return this.value;
    }
    map(fn) {
        return Pipe.of(fn(this.value));
    }
    to(fn) {
        return fn(this.value);
    }
}
