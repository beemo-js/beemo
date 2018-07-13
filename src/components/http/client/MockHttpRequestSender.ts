import {Response, Request, MockServer} from '..'
import {HttpRequestSender} from './HttpRequestSender'

/**
 * Mock HTTP client.
 * Requests will go to an embedded mock server.
 * Useful for quick prototyping.
 */
export class MockHttpRequestSender implements HttpRequestSender {
    constructor(
        private mockServer: MockServer,
        private baseRequest: Request = new Request()
    ) {}

    sendRequest(request: Request): Promise<Response> {
        const finalRequest = Request.merge(this.baseRequest, request)
        return this.mockServer.request(finalRequest)
    }
}
