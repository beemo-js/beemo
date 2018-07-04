import {RequestsQueue} from './RequestsQueue'
import {Request} from '../abstractions/Request'
import {HttpClient} from '..'

/**
 * Sends queued requests when network is available in parallel.
 */
export class BatchRequestsQueue implements RequestsQueue {

    private requests: Request[] = []

    constructor(
        private httpClient: HttpClient,
        private syncServiceWorkerEnabled: boolean,
    ) {}

    queueRequest(request: Request): void {
        this.requests.push(request)
    }

    async queueAndSend(request: Request): Promise<boolean> {
        this.queueRequest(request)
        return this.sendRequests()
    }

    async sendRequests(): Promise<boolean> {
        const requestsToSend = this.requests.splice(0)
        try {
            await this.httpClient.sendRequests(requestsToSend)
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