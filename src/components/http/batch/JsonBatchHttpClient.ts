import {BatchHttpClient} from './BatchHttpClient'
import {HttpClient} from '../client/HttpClient'
import {Request} from '../abstractions/Request'
import {Response} from '../abstractions/Response'
import {RequestBuilder} from '../abstractions/RequestBuilder'
import {ResponseBody} from '..'

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

        const globalRequest = Request.merge(
            this.batchRequest,
            batchRequest,
            new RequestBuilder()
                .body({
                    requests: requests.map(request => this.normalizeRequest(request))
                })
                .build()
        )

        const response = await this.httpClient.sendRequest(globalRequest)
        const jsonResponse: { 'responses': Object[] } = response.body.json()
        return await Promise.all(jsonResponse['responses'].map(async resp => await this.denormalizeResponse(resp, response)))
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
        const resp = new Response(response['status'], new ResponseBody(response['body']), response['headers'], response['statusMessage'])
        return Response.merge(globalResponse, resp)
    }
}
