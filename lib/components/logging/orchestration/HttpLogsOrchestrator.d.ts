import { LogsOrchestrator } from './LogsOrchestrator';
import { RequestsQueue } from '../../http/queue/RequestsQueue';
import { Request } from '../../http/abstractions/Request';
/**
 * Puts logs to requests queue. Logs can thus be sent to server.
 */
export declare class HttpLogsOrchestrator implements LogsOrchestrator {
    private requestsQueue;
    private logToRequestMapper;
    constructor(requestsQueue: RequestsQueue, logToRequestMapper: (log: Object) => Request);
    handleLogs(logs: Object[]): Promise<void>;
}
