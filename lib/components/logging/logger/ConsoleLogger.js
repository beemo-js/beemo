"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Logs logs in console.
 */
var ConsoleLogger = /** @class */ (function () {
    function ConsoleLogger(logDataFormatter) {
        this.logDataFormatter = logDataFormatter;
    }
    ConsoleLogger.prototype.log = function (log) {
        console.log(this.logDataFormatter.format(log));
    };
    return ConsoleLogger;
}());
exports.ConsoleLogger = ConsoleLogger;
