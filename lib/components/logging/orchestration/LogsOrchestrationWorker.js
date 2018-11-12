/**
 * Worker that handle logs stored in logging bag.
 */
export class LogsOrchestrationWorker {
    constructor(loggingBag, logsOrchestrator, collectionInterval) {
        this.loggingBag = loggingBag;
        this.logsOrchestrator = logsOrchestrator;
        this.collectionInterval = collectionInterval;
    }
    start() {
        // First stop to avoid having multiple intervals
        this.stop();
        this.intervalId = setInterval(() => {
            this.logsOrchestrator.handleLogs(this.loggingBag.getLogs());
        }, this.collectionInterval);
    }
    stop() {
        if (!!this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}
