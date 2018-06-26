import {Request} from '../abstractions/Request'
import {Response} from '../abstractions/Response'

/**
 * Interface of an HTTP client.
 */
export interface HttpClient {
    sendRequest(request: Request): Promise<Response>
}