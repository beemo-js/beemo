import {Request} from '../abstractions/Request'
import {Response} from '../abstractions/Response'

export interface BatchHttpClient {
    /**
     * Batches multiple http requests into one and sends it.
     */
    sendRequests(requests: Request[], batchRequest?: Request): Promise<Response[]>
}