import {ResponseBody} from './ResponseBody'

/**
 * Abstraction of an HTTP response.
 */
export class Response {
    constructor(
        public status: number = 200,
        public body: ResponseBody = new ResponseBody(''),
        public statusMessage: string = '',
        public headers: { [key: string]: string } = {}
    ) {}

    /**
     * Clone a response.
     */
    static clone(response: Response): Response {
        return new Response(
            response.status,
            response.body,
            response.statusMessage,
            response.headers
        )
    }

    /**
     * Merge given responses from left to right.
     * - headers and bodies are merged
     * - the rest is overridden
     */
    static merge(...responses: Response[]): Response {
        return responses.reduce((base, response) => {
            if (!response) return base

            base.status = response.status || base.status
            base.body = ResponseBody.merge(base.body, response.body)
            base.statusMessage = response.statusMessage || base.statusMessage
            Object.assign(base.headers, response.headers)

            return base
        }, new Response(null, null))
    }
}