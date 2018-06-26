import {BatchHttpClient} from './BatchHttpClient'
import {HttpClient} from '../client/HttpClient'
import {Request} from '../abstractions/Request'
import {Response} from '../abstractions/Response'

/**
 * Batches requests by serializing them into JSON.
 * They are described in the batch request's body.
 */
export class JsonBatchHttpClient implements BatchHttpClient {
    constructor(
        private httpClient: HttpClient,
        private batchRequest: Request = new Request()
    ) {}

    async sendRequests(requests: Request[], batchRequest: Request = new Request()): Promise<Response[]> {
        if (requests.length === 0) {
            return await []
        }

        const globalRequest = Request.merge(this.batchRequest, batchRequest, new Request('', {
            body: JSON.stringify(requests.map(request => this.normalizeRequest(request)))
        }))

        const response = await this.httpClient.sendRequest(globalRequest)
        const jsonResponse: Object[] = JSON.parse(response.body)
        return await Promise.all(jsonResponse.map(async resp => await this.denormalizeResponse(resp, response)))
    }

    private normalizeRequest(request: Request): Object {
        return {
            method: request.method,
            url: request.getFinalUrl(),
            headers: request.headers,
            body: request.body
        }
    }

    private denormalizeResponse(response: Object, globalResponse: Response): Response {
        const resp = new Response(response['status'], response['body'], {
            headers: response['headers'],
            statusMessage: response['statusMessage']
        })

        return Response.merge(globalResponse, resp)
    }
}
