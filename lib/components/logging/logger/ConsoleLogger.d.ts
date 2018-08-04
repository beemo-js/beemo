import { Logger } from './Logger';
import { LogDataFormatter } from '..';
/**
 * Logs logs in console.
 */
export declare class ConsoleLogger implements Logger {
    private logDataFormatter;
    constructor(logDataFormatter: LogDataFormatter);
    log(log: Object): void;
}
