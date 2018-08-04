import { ResponseBody } from './ResponseBody';
import { Response } from './Response';
/**
 * Response builder.
 */
export declare class ResponseBuilder {
    private _status;
    private _body;
    private _statusMessage;
    private _headers;
    status(value: number): this;
    body(value: ResponseBody | string): this;
    statusMessage(value: string): this;
    headers(value: {
        [p: string]: string;
    }): this;
    build(): Response;
}
