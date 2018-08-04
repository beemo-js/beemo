/**
 * Logs are stored here before being handled by a worker.
 */
export declare class LoggingBag {
    private logs;
    addLog(log: Object): void;
    getLogs(): Object[];
}
