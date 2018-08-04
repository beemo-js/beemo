export declare class RequestBody {
    stringData: string;
    objectData: Object;
    /**
     * Create a request body with string content.
     */
    static fromString(content: string): RequestBody;
    /**
     * Create a request body with data content.
     */
    static fromData(content: Object): RequestBody;
    /**
     * Merge given request bodies from left to right.
     */
    static merge(...requestBodies: RequestBody[]): RequestBody;
    /**
     * Build and get the final content of the request body.
     */
    build(): string;
}
