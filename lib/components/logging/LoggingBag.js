/**
 * Logs are stored here before being handled by a worker.
 */
export class LoggingBag {
    constructor() {
        this.logs = [];
    }
    addLog(log) {
        this.logs.push(log);
    }
    getLogs() {
        return this.logs.splice(0);
    }
}
