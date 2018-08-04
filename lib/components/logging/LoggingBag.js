"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Logs are stored here before being handled by a worker.
 */
var LoggingBag = /** @class */ (function () {
    function LoggingBag() {
        this.logs = [];
    }
    LoggingBag.prototype.addLog = function (log) {
        this.logs.push(log);
    };
    LoggingBag.prototype.getLogs = function () {
        return this.logs.splice(0);
    };
    return LoggingBag;
}());
exports.LoggingBag = LoggingBag;
