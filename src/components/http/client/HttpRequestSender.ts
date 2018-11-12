import {Request} from '../abstractions/Request'
import {Response} from '../abstractions/Response'

export interface HttpRequestSender {
    sendRequest(request: Request): Promise<Response>
}