import {LogsOrchestrator} from './LogsOrchestrator'
import {RequestsQueue} from '../../http/queue/RequestsQueue'
import {Request} from '../../http/abstractions/Request'

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
