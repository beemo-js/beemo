import {Request} from '../abstractions/Request'
import {Response} from '../abstractions/Response'
import {HttpRequestSender} from './HttpRequestSender'

export class HttpClient {
    constructor(
        private requestSender: HttpRequestSender
    ) {}

    async sendRequest(request: Request): Promise<Response> {
        return await this.requestSender.sendRequest(request)
    }

    async sendRequests(requests: Request[]): Promise<Response[]> {
        return Promise.all(requests.map(request => this.sendRequest(request)))
    }
}