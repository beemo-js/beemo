"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestBody = /** @class */ (function () {
    function RequestBody() {
        this.stringData = '';
        this.objectData = {};
    }
    /**
     * Create a request body with string content.
     */
    RequestBody.fromString = function (content) {
        var requestBody = new RequestBody();
        requestBody.stringData = content;
        return requestBody;
    };
    /**
     * Create a request body with data content.
     */
    RequestBody.fromData = function (content) {
        var requestBody = new RequestBody();
        requestBody.objectData = content;
        return requestBody;
    };
    /**
     * Merge given request bodies from left to right.
     */
    RequestBody.merge = function () {
        var requestBodies = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            requestBodies[_i] = arguments[_i];
        }
        var result = new RequestBody();
        return requestBodies.reduce(function (base, requestBody) {
            base.stringData = requestBody.stringData || base.stringData;
            Object.assign(base.objectData, requestBody.objectData);
            return base;
        }, result);
    };
    /**
     * Build and get the final content of the request body.
     */
    RequestBody.prototype.build = function () {
        var filledString = !!this.stringData && this.stringData.length > 0;
        var filledObject = !!this.objectData && Object.keys(this.objectData).length > 0;
        if (filledString && filledObject) {
            throw 'Error when building request body: request body cannot have both string and object data';
        }
        return filledString ? this.stringData :
            filledObject ? JSON.stringify(this.objectData) :
                '';
    };
    return RequestBody;
}());
exports.RequestBody = RequestBody;
