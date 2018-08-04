import { RequestBody } from './RequestBody';
/**
 * Abstraction of an HTTP request.
 */
export declare class Request {
    url: string;
    method: string;
    urlParameters: {
        [key: string]: string;
    };
    host: string;
    headers: {
        [key: string]: string;
    };
    body: RequestBody;
    constructor(url?: string, method?: string, urlParameters?: {
        [key: string]: string;
    }, host?: string, headers?: {
        [key: string]: string;
    }, body?: RequestBody);
    /**
     * Clone a request.
     */
    static clone(request: Request): Request;
    /**
     * Merge given requests from left to right.
     * - urls are concatenated
     * - url parameters, bodies and headers are merged
     * - the rest is overridden
     */
    static merge(...requests: Request[]): Request;
    /**
     * Build request url from host, url and url params.
     */
    getFinalUrl(): string;
    /**
     * Builds the params part of the url.
     */
    private getUrlParams();
    /**
     * Concatenate given urls.
     */
    private static mergeUrls(...urls);
}
