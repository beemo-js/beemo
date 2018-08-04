import { Request, Response, Interceptor } from '..';
import { HttpRequestSender } from './HttpRequestSender';
export declare class HttpClient {
    private requestSender;
    /**
     * Request interceptors / middleware.
     */
    private interceptors;
    constructor(requestSender: HttpRequestSender);
    sendRequest(request: Request): Promise<Response>;
    sendRequests(requests: Request[]): Promise<Response[]>;
    useInterceptor(interceptor: Interceptor): void;
}
