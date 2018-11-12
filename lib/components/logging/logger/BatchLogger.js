/**
 * Store logs in a logging bag.
 * They will then be handled by a worker.
 */
export class BatchLogger {
    constructor(logDataFormatter, loggingBag) {
        this.logDataFormatter = logDataFormatter;
        this.loggingBag = loggingBag;
    }
    log(log) {
        this.loggingBag.addLog(this.logDataFormatter.format(log));
    }
}
