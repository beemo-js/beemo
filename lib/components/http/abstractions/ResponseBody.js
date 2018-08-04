"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseBody = /** @class */ (function () {
    function ResponseBody(content) {
        this.content = content;
    }
    /**
     * Merge given response bodies from left to right.
     */
    ResponseBody.merge = function () {
        var responseBodies = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            responseBodies[_i] = arguments[_i];
        }
        var result = new ResponseBody('');
        return responseBodies.reduce(function (base, responseBody) {
            base.content = responseBody.content || base.content;
            return base;
        }, result);
    };
    /**
     * Get the parsed data of the JSON content.
     */
    ResponseBody.prototype.json = function () {
        return JSON.parse(this.content);
    };
    return ResponseBody;
}());
exports.ResponseBody = ResponseBody;
