import {RequestsQueue} from './RequestsQueue'
import {Request} from '../abstractions/Request'
import {HttpClient} from '../client/HttpClient'

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

    async send(request: Request): Promise<boolean> {
        try {
            await this.httpClient.sendRequest(request)
            return true
        } catch (e) {
            // If sync service worker is enabled, let it sync in background
            if (!this.syncServiceWorkerEnabled) {
                this.requests.push(request)
            }
            return false
        }
    }

    async sendRequests(): Promise<boolean> {
        const requestsToSend = this.requests.splice(0)
        try {
            await this.httpClient.sendRequests(requestsToSend)
            return true
        } catch (e) {
            // If sync service worker is enabled, let it sync in background
            if (!this.syncServiceWorkerEnabled) {
                this.requests = this.requests.concat(requestsToSend)
            }
            return false
        }
    }
}