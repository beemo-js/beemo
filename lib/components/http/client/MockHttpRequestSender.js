import { Request } from '../abstractions/Request';
/**
 * Mock HTTP client.
 * Requests will go to an embedded mock server.
 * Useful for quick prototyping.
 */
export class MockHttpRequestSender {
    constructor(mockServer, baseRequest = new Request()) {
        this.mockServer = mockServer;
        this.baseRequest = baseRequest;
    }
    sendRequest(request) {
        const finalRequest = Request.merge(this.baseRequest, request);
        return this.mockServer.request(finalRequest);
    }
}
