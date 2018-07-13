import {LogsOrchestrator} from './LogsOrchestrator'
import {Request, RequestsQueue} from '../../http'

/**
 * Puts logs to requests queue. Logs can thus be sent to server.
 */
export class HttpLogsOrchestrator implements LogsOrchestrator {
    constructor(
        private requestsQueue: RequestsQueue,
        private logToRequestMapper: (log: Object) => Request
    ) {}

    async handleLogs(logs: Object[]): Promise<void> {
        logs.forEach(log => this.requestsQueue.queueRequest(this.logToRequestMapper(log)))
    }
}
