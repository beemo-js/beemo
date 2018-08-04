"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Monad to pipe value through a list of functions.
 */
var Pipe = /** @class */ (function () {
    function Pipe(value) {
        this.value = value;
    }
    Pipe.of = function (value) {
        return new Pipe(value);
    };
    Pipe.prototype.get = function () {
        return this.value;
    };
    Pipe.prototype.map = function (fn) {
        return Pipe.of(fn(this.value));
    };
    Pipe.prototype.to = function (fn) {
        return fn(this.value);
    };
    return Pipe;
}());
exports.Pipe = Pipe;
