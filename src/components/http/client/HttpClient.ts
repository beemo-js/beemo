import {Request} from '../abstractions/Request'
import {Response} from '../abstractions/Response'
import {HttpRequestSender} from './HttpRequestSender'

type Interceptor = (next: (req: Request) => Promise<Response>, request: Request) => Promise<Response>

export class HttpClient {
    /**
     * Request interceptors / middleware.
     */
    private interceptors: Interceptor[] = []

    constructor(
        private requestSender: HttpRequestSender
    ) {}

    async sendRequest(request: Request): Promise<Response> {
        const interceptors = this.interceptors
        interceptors.push(async (next, request) => this.requestSender.sendRequest(request))
        const send = async req => await this.requestSender.sendRequest(req)
        let interceptorIndex = 1
        const next = async req => await interceptors[interceptorIndex++](next, req)
        return await interceptors[0](next, request)
    }

    async sendRequests(requests: Request[]): Promise<Response[]> {
        return Promise.all(requests.map(request => this.sendRequest(request)))
    }

    useInterceptor(interceptor: Interceptor): void {
        this.interceptors.push(interceptor)
    }
}