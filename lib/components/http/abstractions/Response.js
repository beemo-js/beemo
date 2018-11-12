import { ResponseBody } from './ResponseBody';
/**
 * Abstraction of an HTTP response.
 */
export class Response {
    constructor(status = 200, body = new ResponseBody(''), statusMessage = '', headers = {}) {
        this.status = status;
        this.body = body;
        this.statusMessage = statusMessage;
        this.headers = headers;
    }
    /**
     * Clone a response.
     */
    static clone(response) {
        return new Response(response.status, response.body, response.statusMessage, response.headers);
    }
    /**
     * Merge given responses from left to right.
     * - headers and bodies are merged
     * - the rest is overridden
     */
    static merge(...responses) {
        return responses.reduce((base, response) => {
            if (!response)
                return base;
            base.status = response.status || base.status;
            base.body = ResponseBody.merge(base.body, response.body);
            base.statusMessage = response.statusMessage || base.statusMessage;
            Object.assign(base.headers, response.headers);
            return base;
        }, new Response(null, null));
    }
}
