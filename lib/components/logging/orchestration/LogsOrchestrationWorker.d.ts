import { LoggingBag } from '../LoggingBag';
import { LogsOrchestrator } from './LogsOrchestrator';
/**
 * Worker that handle logs stored in logging bag.
 */
export declare class LogsOrchestrationWorker {
    private loggingBag;
    private logsOrchestrator;
    private collectionInterval;
    private intervalId;
    constructor(loggingBag: LoggingBag, logsOrchestrator: LogsOrchestrator, collectionInterval: number);
    start(): void;
    stop(): void;
}
