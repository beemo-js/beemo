import {HttpClient} from './HttpClient'
import {Request as AbstractRequest} from '../abstractions/Request'
import {Response as AbstractResponse} from '../abstractions/Response'

export class WebHttpClient implements HttpClient {

    constructor(
        private baseRequest: AbstractRequest = new AbstractRequest(),
    ) {}

    async sendRequest(request: AbstractRequest): Promise<AbstractResponse> {
        if (navigator && navigator.onLine === false) {
            throw 'No connection.'
        }

        const finalRequest = this.mapRequest(AbstractRequest.merge(this.baseRequest, request))

        return await this.mapResponse(await fetch(finalRequest))
    }

    private mapRequest(request: AbstractRequest): Request {
        return new Request(request.getFinalUrl(), {
            method: request.method,
            headers: request.headers,
            body: request.body
        })
    }

    private async mapResponse(response: Response): Promise<AbstractResponse> {
        const headers = {}
        response.headers.forEach((key, value) => { headers[key] = value })

        return new AbstractResponse(response.status, await response.text(), {
            statusMessage: response.statusText,
            headers: headers
        })
    }
}
