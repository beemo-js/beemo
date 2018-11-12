import {Logger} from './Logger'
import {LogDataFormatter} from '../formatter/LogDataFormatter'

/**
 * Logs logs in console.
 */
export class ConsoleLogger implements Logger {
    constructor(
        private logDataFormatter: LogDataFormatter
    ) {}

    log(log: Object): void {
        console.log(this.logDataFormatter.format(log))
    }
}