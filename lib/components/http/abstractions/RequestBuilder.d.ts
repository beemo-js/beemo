import { RequestBody } from './RequestBody';
import { Request } from './Request';
/**
 * Request builder.
 */
export declare class RequestBuilder {
    private _url;
    private _method;
    private _urlParameters;
    private _host;
    private _headers;
    private _body;
    url(value: string): this;
    method(value: string): this;
    urlParameters(value: {
        [p: string]: string;
    }): this;
    host(value: string): this;
    headers(value: {
        [p: string]: string;
    }): this;
    body(value: RequestBody | string | Object): this;
    build(): Request;
}
