import {Response} from '../abstractions/Response'
import {Request} from '../abstractions/Request'
import {MockServer} from '../server/MockServer'
import {BaseHttpClient} from './BaseHttpClient'

/**
 * Mock HTTP client.
 * Requests will go to an embedded mock server.
 * Useful for quick prototyping.
 */
export class MockHttpClient extends BaseHttpClient {
    constructor(
        private mockServer: MockServer,
        private baseRequest: Request = new Request()
    ) {
        super()
    }

    async sendRequest(request: Request): Promise<Response> {
        const finalRequest = Request.merge(this.baseRequest, request)
        return await this.mockServer.request(finalRequest)
    }
}
