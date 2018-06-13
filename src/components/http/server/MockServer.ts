import {Request} from '../abstractions/Request'
import {Response} from '../abstractions/Response'

type route  = {
    pattern: string,
    controller: (request: Request) => Response
}

export class MockServer {
    constructor(
        public routes: route[],
        // time to wait before receiving a response
        public latency: number = 300
    ) {}

    async request(request: Request): Promise<Response> {
        const resource = this.findRoute(request.getFinalUrl())

        if (!resource) {
            return await new Response(404, JSON.stringify({ message: 'Not Found' }))
        }

        await new Promise(resolve => setTimeout(resolve, this.latency))

        return resource.controller(request)
    }

    private findRoute(url: string): route {
        return this.routes.find(({pattern}) => new RegExp(pattern).test(url))
    }
}