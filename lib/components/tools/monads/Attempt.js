"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Monad to handle exceptions.
 */
var Attempt = /** @class */ (function () {
    function Attempt(value, exception, succeeded) {
        this.value = value;
        this.exception = exception;
        this.succeeded = succeeded;
    }
    Attempt.of = function (fn) {
        try {
            return new Attempt(fn(), null, true);
        }
        catch (e) {
            return new Attempt(null, e, false);
        }
    };
    Attempt.prototype.get = function () {
        if (!this.succeeded) {
            throw this.exception;
        }
        return this.value;
    };
    Attempt.prototype.getOrDefault = function (defaultValue) {
        return this.succeeded ? this.value : defaultValue;
    };
    Attempt.prototype.getOrElse = function (fn) {
        if (this.succeeded) {
            return this.value;
        }
        fn(this.exception);
        return null;
    };
    Attempt.prototype.getOrThrow = function (exception) {
        if (!this.succeeded) {
            throw exception;
        }
        return this.value;
    };
    Attempt.prototype.map = function (fn) {
        var _this = this;
        return this.succeeded ? Attempt.of(function () { return fn(_this.value); }) : this;
    };
    Attempt.prototype.recover = function (fn) {
        if (!this.succeeded) {
            fn(this.exception);
        }
        return this;
    };
    Attempt.prototype.to = function (fn) {
        return fn(this.value);
    };
    Attempt.prototype.ignoreFail = function () {
        return this;
    };
    return Attempt;
}());
exports.Attempt = Attempt;
