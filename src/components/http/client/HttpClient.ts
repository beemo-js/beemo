import {Request} from '../abstractions/Request'
import {Response} from '../abstractions/Response'
import {HttpRequestSender} from './HttpRequestSender'
import {Interceptor} from '../interceptors/interceptors'

export class HttpClient {
    /**
     * Request interceptors / middleware.
     */
    private interceptors: Interceptor[] = []

    constructor(
        private requestSender: HttpRequestSender
    ) {}

    async sendRequest(request: Request): Promise<Response> {
        const interceptors = this.interceptors.slice()
        interceptors.push((next, request) => this.requestSender.sendRequest(request))

        let ii = 0
        const nextFns = interceptors.map(() => (i => req => interceptors[i](nextFns[i], req))(++ii))
        return interceptors[0](nextFns[0], request)
    }

    async sendRequests(requests: Request[]): Promise<Response[]> {
        return Promise.all(requests.map(request => this.sendRequest(request)))
    }

    useInterceptor(interceptor: Interceptor): void {
        this.interceptors.push(interceptor)
    }
}