import {BatchHttpClient} from '../batch/BatchHttpClient'
import {RequestsQueue} from './RequestsQueue'
import {Request} from '../abstractions/Request'

// Send queued requests when network is available
export class BatchRequestsQueue implements RequestsQueue {

    private requests: Request[] = []

    constructor(
        private batchHttpClient: BatchHttpClient,
        private syncServiceWorkerEnabled: boolean,
        private batchRequest: Request = new Request()
    ) {}

    queueRequest(request: Request): void {
        this.requests.push(request)
    }

    async queueAndSend(request: Request): Promise<boolean> {
        this.queueRequest(request)
        return this.sendRequests()
    }

    // Returns true if requests could be sent immediately
    async sendRequests(): Promise<boolean> {
        const requestsToSend = this.requests.splice(0)
        try {
            await this.batchHttpClient.sendRequests(requestsToSend, this.batchRequest)
            return true
        } catch (e) {
            console.log(e)
            // If sync service worker is enabled, let it sync in background
            if (!this.syncServiceWorkerEnabled) {
                this.requests = this.requests.concat(requestsToSend)
            }
            return false
        }
    }
}