"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function registerQueue(requestsQueue, backgroundLoop, collectionInterval, loopId, syncServiceWorkerEnabled) {
    var _this = this;
    backgroundLoop.setTask(loopId, function () { return requestsQueue.sendRequests(); }, collectionInterval);
    if (navigator && navigator.onLine !== undefined && !syncServiceWorkerEnabled) {
        if (navigator.onLine) {
            backgroundLoop.start(this.loopId);
            document.addEventListener('offline', function () { return _this.stopCollection(); });
        }
        else {
            document.addEventListener('online', function () { return _this.startCollection(); });
        }
    }
    else {
        backgroundLoop.start(loopId);
    }
}
exports.registerQueue = registerQueue;
