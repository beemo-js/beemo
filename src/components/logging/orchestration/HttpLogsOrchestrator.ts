import {LogsOrchestrator} from './LogsOrchestrator'
import {Request} from '../../http/abstractions/Request'
import {RequestsQueue} from '../../http/queue/RequestsQueue'

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
