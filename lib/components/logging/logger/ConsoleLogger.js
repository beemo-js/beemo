/**
 * Logs logs in console.
 */
export class ConsoleLogger {
    constructor(logDataFormatter) {
        this.logDataFormatter = logDataFormatter;
    }
    log(log) {
        console.log(this.logDataFormatter.format(log));
    }
}
