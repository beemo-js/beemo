import {HttpClient} from './HttpClient'
import {Response} from '../abstractions/Response'
import {Request} from '../abstractions/Request'

export class TestHttpClient implements HttpClient {
    async sendRequest(request: Request): Promise<Response> {
        return await new Response(200, JSON.stringify({
            url: request.getFinalUrl(),
            body: request.body
        }), {
            headers: {
                context: 'Test'
            },
            statusMessage: 'From tests'
        })
    }
}
