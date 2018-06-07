import {Request} from '../abstractions/Request'
import {Response} from '../abstractions/Response'

export interface BatchHttpClient {
    sendRequests(requests: Request[], batchRequest?: Request): Promise<Response[]>
}