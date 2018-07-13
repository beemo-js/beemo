import {Logger} from './Logger'
import {LoggingBag, LogDataFormatter} from '..'

/**
 * Store logs in a logging bag.
 * They will then be handled by a worker.
 */
export class BatchLogger implements Logger {
    constructor(
        private logDataFormatter: LogDataFormatter,
        private loggingBag: LoggingBag
    ) {}

    log(log: Object): void {
        this.loggingBag.addLog(this.logDataFormatter.format(log))
    }
}