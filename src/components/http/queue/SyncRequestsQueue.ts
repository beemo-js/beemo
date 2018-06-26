import {RequestsQueue} from './RequestsQueue'
import {HttpClient} from '../client/HttpClient'
import {Request} from '../abstractions/Request'

/**
 * Sends queued requests one by one.
 */
export class SyncRequestsQueue implements RequestsQueue {

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

    /**
     * Returns true if requests could be sent immediately
     */
    private async sendRequest(request: Request): Promise<boolean> {
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
        const len = this.requests.length
        let request: Request
        let result = true
        let responseSent: boolean
        for (let i = 0; i < len; i++) {
            request = this.requests.shift()
            responseSent = await this.sendRequest(request)
            result = result && responseSent
        }
        return result
    }
}