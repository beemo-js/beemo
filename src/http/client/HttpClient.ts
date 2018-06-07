import {Request} from '../abstractions/Request'
import {Response} from '../abstractions/Response'

export interface HttpClient {
    sendRequest(request: Request): Promise<Response>
}