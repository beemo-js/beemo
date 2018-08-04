import {Request, Response, ResponseBuilder, route} from '..'

/**
 * Simple embedded mock server. Requests sent by MockHttpRequestSender are handled by provided controllers.
 */
export class MockServer {
    constructor(
        /** Routes to handle requests */
        public routes: route[],
        /** time to wait before receiving a response */
        public latency: number = 300
    ) {}

    /**
     * Handle given request.
     */
    async request(request: Request): Promise<Response> {
        const resource = this.findRoute(request.getFinalUrl())

        if (!resource) {
            return new ResponseBuilder().status(404).body(JSON.stringify({ message: 'Not Found' })).build()
        }

        // sleep
        await new Promise(resolve => setTimeout(resolve, this.latency))

        return resource.controller(request)
    }

    /**
     * Find route from given url by pattern matching.
     */
    private findRoute(url: string): route {
        return this.routes.find(({pattern}) => new RegExp(pattern).test(url))
    }
}