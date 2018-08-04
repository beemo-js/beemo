import { ResponseBody } from './ResponseBody';
/**
 * Abstraction of an HTTP response.
 */
export declare class Response {
    status: number;
    body: ResponseBody;
    statusMessage: string;
    headers: {
        [key: string]: string;
    };
    constructor(status: number, body?: ResponseBody, statusMessage?: string, headers?: {
        [key: string]: string;
    });
    /**
     * Clone a response.
     */
    static clone(response: Response): Response;
    /**
     * Merge given responses from left to right.
     * - headers and bodies are merged
     * - the rest is overridden
     */
    static merge(...responses: Response[]): Response;
}
