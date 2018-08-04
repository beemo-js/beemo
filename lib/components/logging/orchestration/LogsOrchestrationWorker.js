"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Worker that handle logs stored in logging bag.
 */
var LogsOrchestrationWorker = /** @class */ (function () {
    function LogsOrchestrationWorker(loggingBag, logsOrchestrator, collectionInterval) {
        this.loggingBag = loggingBag;
        this.logsOrchestrator = logsOrchestrator;
        this.collectionInterval = collectionInterval;
    }
    LogsOrchestrationWorker.prototype.start = function () {
        var _this = this;
        // First stop to avoid having multiple intervals
        this.stop();
        this.intervalId = setInterval(function () {
            _this.logsOrchestrator.handleLogs(_this.loggingBag.getLogs());
        }, this.collectionInterval);
    };
    LogsOrchestrationWorker.prototype.stop = function () {
        if (!!this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    };
    return LogsOrchestrationWorker;
}());
exports.LogsOrchestrationWorker = LogsOrchestrationWorker;
