export declare class ResponseBody {
    content: string;
    constructor(content: string);
    /**
     * Merge given response bodies from left to right.
     */
    static merge(...responseBodies: ResponseBody[]): ResponseBody;
    /**
     * Get the parsed data of the JSON content.
     */
    json(): any;
}
