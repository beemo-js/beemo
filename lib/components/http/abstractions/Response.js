"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseBody_1 = require("./ResponseBody");
/**
 * Abstraction of an HTTP response.
 */
var Response = /** @class */ (function () {
    function Response(status, body, statusMessage, headers) {
        if (status === void 0) { status = 200; }
        if (body === void 0) { body = new ResponseBody_1.ResponseBody(''); }
        if (statusMessage === void 0) { statusMessage = ''; }
        if (headers === void 0) { headers = {}; }
        this.status = status;
        this.body = body;
        this.statusMessage = statusMessage;
        this.headers = headers;
    }
    /**
     * Clone a response.
     */
    Response.clone = function (response) {
        return new Response(response.status, response.body, response.statusMessage, response.headers);
    };
    /**
     * Merge given responses from left to right.
     * - headers and bodies are merged
     * - the rest is overridden
     */
    Response.merge = function () {
        var responses = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            responses[_i] = arguments[_i];
        }
        return responses.reduce(function (base, response) {
            if (!response)
                return base;
            base.status = response.status || base.status;
            base.body = ResponseBody_1.ResponseBody.merge(base.body, response.body);
            base.statusMessage = response.statusMessage || base.statusMessage;
            Object.assign(base.headers, response.headers);
            return base;
        }, new Response(null, null));
    };
    return Response;
}());
exports.Response = Response;
