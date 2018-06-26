/**
 * Abstraction of an HTTP response.
 */
export class Response {
    status: number
    body: string
    statusMessage: string
    headers: { [key: string]: string }

    constructor(
        status: number,
        body: string,
        {
            statusMessage = '',
            headers = {}
        }: {
            statusMessage?: string,
            headers?: { [key: string]: string }
        } = {}
    ) {
        this.status = status
        this.body = body
        this.statusMessage = statusMessage
        this.headers = headers
    }

    /**
     * Clone a response.
     */
    static clone(response: Response): Response {
        return new Response(response.status, response.body, {
            statusMessage: response.statusMessage,
            headers: response.headers
        })
    }

    /**
     * Merge given responses from left to right.
     * - headers are merged
     * - the rest is overridden
     */
    static merge(...responses: Response[]): Response {
        const result = new Response(null, null)
        return responses.reduce((base, response) => {
            base.status = response.status || base.status
            base.body = response.body || base.body
            base.statusMessage = response.statusMessage || base.statusMessage
            Object.assign(base.headers, response.headers)

            return base
        }, result)
    }
}