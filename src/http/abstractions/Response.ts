export class Response {
    statusMessage: string
    headers: { [key: string]: string }

    constructor(
        public status: number,
        public body: string,
        {
            statusMessage = '',
            headers = {}
        }: {
            statusMessage?: string,
            headers?: { [key: string]: string }
        } = {}
    ) {
        this.statusMessage = statusMessage
        this.headers = headers
    }

    static clone(response: Response): Response {
        return new Response(response.status, response.body, {
            statusMessage: response.statusMessage,
            headers: response.headers
        })
    }

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