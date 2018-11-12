export class ResponseBody {
    constructor(content) {
        this.content = content;
    }
    /**
     * Merge given response bodies from left to right.
     */
    static merge(...responseBodies) {
        const result = new ResponseBody('');
        return responseBodies.reduce((base, responseBody) => {
            base.content = responseBody.content || base.content;
            return base;
        }, result);
    }
    /**
     * Get the parsed data of the JSON content.
     */
    json() {
        return JSON.parse(this.content);
    }
}
