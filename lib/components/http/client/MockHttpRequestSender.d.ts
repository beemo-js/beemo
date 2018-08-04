import { Response, Request, MockServer } from '..';
import { HttpRequestSender } from './HttpRequestSender';
/**
 * Mock HTTP client.
 * Requests will go to an embedded mock server.
 * Useful for quick prototyping.
 */
export declare class MockHttpRequestSender implements HttpRequestSender {
    private mockServer;
    private baseRequest;
    constructor(mockServer: MockServer, baseRequest?: Request);
    sendRequest(request: Request): Promise<Response>;
}
