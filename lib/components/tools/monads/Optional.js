"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Monad to handle nullable values.
 */
var Optional = /** @class */ (function () {
    function Optional(value, defined) {
        this.value = value;
        this.defined = defined;
    }
    Optional.of = function (value) {
        if (value === null || value === undefined) {
            return new Optional(null, false);
        }
        return new Optional(value, true);
    };
    Optional.prototype.get = function () {
        if (!this.defined) {
            throw 'Tried to access undefined Optional value.';
        }
        return this.value;
    };
    Optional.prototype.getOrDefault = function (defaultValue) {
        return this.defined ? this.value : defaultValue;
    };
    Optional.prototype.getOrThrow = function (exception) {
        if (!this.defined) {
            throw exception;
        }
        return this.value;
    };
    Optional.prototype.getOrNull = function () {
        return this.defined ? this.value : null;
    };
    Optional.prototype.map = function (fn) {
        return this.defined ? Optional.of(fn(this.value)) : this;
    };
    Optional.prototype.to = function (fn) {
        return fn(this.value);
    };
    return Optional;
}());
exports.Optional = Optional;
