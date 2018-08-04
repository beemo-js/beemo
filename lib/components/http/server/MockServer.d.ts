import { Request, Response, route } from '..';
/**
 * Simple embedded mock server. Requests sent by MockHttpRequestSender are handled by provided controllers.
 */
export declare class MockServer {
    /** Routes to handle requests */
    routes: route[];
    /** time to wait before receiving a response */
    latency: number;
    constructor(
        /** Routes to handle requests */
        routes: route[], 
        /** time to wait before receiving a response */
        latency?: number);
    /**
     * Handle given request.
     */
    request(request: Request): Promise<Response>;
    /**
     * Find route from given url by pattern matching.
     */
    private findRoute(url);
}
