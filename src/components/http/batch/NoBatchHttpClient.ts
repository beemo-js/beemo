import {BatchHttpClient} from './BatchHttpClient'
import {HttpClient} from '../client/HttpClient'
import {Request} from '../abstractions/Request'
import {Response} from '../abstractions/Response'

/**
 * Sends batched requests in parallel.
 * To use when requests batching is not desired.
 */
export class NoBatchHttpClient implements BatchHttpClient {
    constructor(
        private httpClient: HttpClient
    ) {}

    async sendRequests(requests: Request[], batchRequest: Request = new Request()): Promise<Response[]> {
        return await Promise.all(
            requests.map(async req => await this.httpClient.sendRequest(req))
        )
    }
}