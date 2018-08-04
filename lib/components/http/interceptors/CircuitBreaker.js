"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CircuitBreaker = /** @class */ (function () {
    function CircuitBreaker(failuresThreshold, successThreshold, openStateTimeout) {
        this.failuresThreshold = failuresThreshold;
        this.successThreshold = successThreshold;
        this.openStateTimeout = openStateTimeout;
        this.state = 'CLOSED';
        this.nbSuccess = 0;
        this.nbFailures = 0;
    }
    CircuitBreaker.prototype.attempt = function (fn) {
        switch (this.state) {
            case 'CLOSED':
                try {
                    var result = fn();
                    this.nbFailures = 0;
                    return result;
                }
                catch (e) {
                    this.nbFailures++;
                    if (this.nbFailures >= this.failuresThreshold) {
                        this.open();
                    }
                    throw e;
                }
            case 'OPEN':
                throw 'Circuit breaker open.';
            case 'HALF-OPEN':
                try {
                    var result = fn();
                    this.nbSuccess++;
                    if (this.nbSuccess >= this.successThreshold) {
                        this.close();
                    }
                    return result;
                }
                catch (e) {
                    this.open();
                    throw e;
                }
        }
    };
    CircuitBreaker.prototype.close = function () {
        this.state = 'CLOSED';
        this.reinit();
    };
    CircuitBreaker.prototype.halfOpen = function () {
        this.state = 'HALF-OPEN';
        this.reinit();
    };
    CircuitBreaker.prototype.open = function () {
        var _this = this;
        this.state = 'OPEN';
        this.reinit();
        this.timeoutId = setTimeout(function () { return _this.halfOpen(); }, this.openStateTimeout);
    };
    CircuitBreaker.prototype.reinit = function () {
        if (!!this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
        this.nbSuccess = 0;
        this.nbFailures = 0;
    };
    return CircuitBreaker;
}());
exports.CircuitBreaker = CircuitBreaker;
