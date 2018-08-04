"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Store logs in a logging bag.
 * They will then be handled by a worker.
 */
var BatchLogger = /** @class */ (function () {
    function BatchLogger(logDataFormatter, loggingBag) {
        this.logDataFormatter = logDataFormatter;
        this.loggingBag = loggingBag;
    }
    BatchLogger.prototype.log = function (log) {
        this.loggingBag.addLog(this.logDataFormatter.format(log));
    };
    return BatchLogger;
}());
exports.BatchLogger = BatchLogger;
