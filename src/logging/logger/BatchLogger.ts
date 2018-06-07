import {Logger} from './Logger'
import {LoggingBag} from '../LoggingBag'
import {LogDataFormatter} from '../formatter/LogDataFormatter'

export class BatchLogger implements Logger {
    constructor(
        private logDataFormatter: LogDataFormatter,
        private loggingBag: LoggingBag
    ) {}

    log(log: Object): void {
        this.loggingBag.addLog(this.logDataFormatter.format(log))
    }
}