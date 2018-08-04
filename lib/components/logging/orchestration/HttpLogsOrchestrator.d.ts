import { LogsOrchestrator } from './LogsOrchestrator';
import { Request, RequestsQueue } from '../../http';
/**
 * Puts logs to requests queue. Logs can thus be sent to server.
 */
export declare class HttpLogsOrchestrator implements LogsOrchestrator {
    private requestsQueue;
    private logToRequestMapper;
    constructor(requestsQueue: RequestsQueue, logToRequestMapper: (log: Object) => Request);
    handleLogs(logs: Object[]): Promise<void>;
}
