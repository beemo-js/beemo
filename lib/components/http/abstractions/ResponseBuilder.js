"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseBody_1 = require("./ResponseBody");
var Response_1 = require("./Response");
/**
 * Response builder.
 */
var ResponseBuilder = /** @class */ (function () {
    function ResponseBuilder() {
    }
    ResponseBuilder.prototype.status = function (value) {
        this._status = value;
        return this;
    };
    ResponseBuilder.prototype.body = function (value) {
        this._body = value instanceof ResponseBody_1.ResponseBody ? value : new ResponseBody_1.ResponseBody(value);
        return this;
    };
    ResponseBuilder.prototype.statusMessage = function (value) {
        this._statusMessage = value;
        return this;
    };
    ResponseBuilder.prototype.headers = function (value) {
        this._headers = value;
        return this;
    };
    ResponseBuilder.prototype.build = function () {
        return new Response_1.Response(this._status, this._body, this._statusMessage, this._headers);
    };
    return ResponseBuilder;
}());
exports.ResponseBuilder = ResponseBuilder;
