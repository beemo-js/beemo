import { Request } from '../abstractions/Request';
import { Response } from '../abstractions/Response';
import { HttpRequestSender } from './HttpRequestSender';
import { MockServer } from '../server/MockServer';
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
