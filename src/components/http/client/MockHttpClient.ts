import {HttpClient} from './HttpClient'
import {Response} from '../abstractions/Response'
import {Request} from '../abstractions/Request'
import {MockServer} from '../server/MockServer'

/**
 * Mock HTTP client.
 * Requests will go to an embedded mock server.
 * Useful for quick prototyping.
 */
export class MockHttpClient implements HttpClient {
    constructor(
        private mockServer: MockServer,
        private baseRequest: Request = new Request()
    ) {}

    async sendRequest(request: Request): Promise<Response> {
        const finalRequest = Request.merge(this.baseRequest, request)
        return await this.mockServer.request(finalRequest)
    }
}
