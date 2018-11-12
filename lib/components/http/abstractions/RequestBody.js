export class RequestBody {
    constructor() {
        this.stringData = '';
        this.objectData = {};
    }
    /**
     * Create a request body with string content.
     */
    static fromString(content) {
        const requestBody = new RequestBody();
        requestBody.stringData = content;
        return requestBody;
    }
    /**
     * Create a request body with data content.
     */
    static fromData(content) {
        const requestBody = new RequestBody();
        requestBody.objectData = content;
        return requestBody;
    }
    /**
     * Merge given request bodies from left to right.
     */
    static merge(...requestBodies) {
        const result = new RequestBody();
        return requestBodies.reduce((base, requestBody) => {
            base.stringData = requestBody.stringData || base.stringData;
            Object.assign(base.objectData, requestBody.objectData);
            return base;
        }, result);
    }
    /**
     * Build and get the final content of the request body.
     */
    build() {
        const filledString = !!this.stringData && this.stringData.length > 0;
        const filledObject = !!this.objectData && Object.keys(this.objectData).length > 0;
        if (filledString && filledObject) {
            throw 'Error when building request body: request body cannot have both string and object data';
        }
        return filledString ? this.stringData :
            filledObject ? JSON.stringify(this.objectData) :
                '';
    }
}
