import {Request} from '../abstractions/Request'
import {Response} from '../abstractions/Response'
import {ResponseBuilder} from '../abstractions/ResponseBuilder'

/**
 * Map of a route to a controller.
 */
type route  = {
    // regex to match url
    pattern: string,
    // returns response from request
    controller: (request: Request) => Response
}

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
            return await new ResponseBuilder().status(404).body(JSON.stringify({ message: 'Not Found' })).build()
        }

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