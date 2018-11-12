import { Logger } from './Logger';
import { LogDataFormatter } from '../formatter/LogDataFormatter';
import { LoggingBag } from '../LoggingBag';
/**
 * Store logs in a logging bag.
 * They will then be handled by a worker.
 */
export declare class BatchLogger implements Logger {
    private logDataFormatter;
    private loggingBag;
    constructor(logDataFormatter: LogDataFormatter, loggingBag: LoggingBag);
    log(log: Object): void;
}
