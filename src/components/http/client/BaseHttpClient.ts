import {HttpClient} from './HttpClient'
import {Request, Response} from '..'

export abstract class BaseHttpClient implements HttpClient {
    abstract async sendRequest(request: Request): Promise<Response>

    async sendRequests(requests: Request[]): Promise<Response[]> {
        return Promise.all(requests.map(request => this.sendRequest(request)))
    }
}
