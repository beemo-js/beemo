import {Request as AbstractRequest} from '../../../../../components/http/abstractions/Request'
import {Response as AbstractResponse} from '../../../../../components/http/abstractions/Response'
import {ResponseBody} from '../../../../../components/http'
import {BaseHttpClient} from '../../../../../components/http/client/BaseHttpClient'

export class WebHttpClient extends BaseHttpClient {

    constructor(
        private baseRequest: AbstractRequest = new AbstractRequest(),
    ) {
        super()
    }

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
            body: request.body.build()
        })
    }

    private async mapResponse(response: Response): Promise<AbstractResponse> {
        const headers = {}
        response.headers.forEach((key, value) => { headers[key] = value })

        return new AbstractResponse(
            response.status,
            new ResponseBody(await response.text()),
            response.statusText,
            headers
        )
    }
}
