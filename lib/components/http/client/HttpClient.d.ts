import { Request } from '../abstractions/Request';
import { Response } from '../abstractions/Response';
import { HttpRequestSender } from './HttpRequestSender';
import { Interceptor } from '../interceptors/interceptors';
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
