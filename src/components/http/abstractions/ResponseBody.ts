export class ResponseBody {
    constructor(
        public content: string
    ) {}

    /**
     * Merge given response bodies from left to right.
     */
    static merge(...responseBodies: ResponseBody[]): ResponseBody {
        const result = new ResponseBody('')
        return responseBodies.reduce((base, responseBody) => {
            base.content = responseBody.content || base.content
            return base
        }, result)
    }

    /**
     * Get the parsed data of the JSON content.
     */
    json(): any {
        return JSON.parse(this.content)
    }
}