"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestBody_1 = require("./RequestBody");
var Request_1 = require("./Request");
/**
 * Request builder.
 */
var RequestBuilder = /** @class */ (function () {
    function RequestBuilder() {
    }
    RequestBuilder.prototype.url = function (value) {
        this._url = value;
        return this;
    };
    RequestBuilder.prototype.method = function (value) {
        this._method = value;
        return this;
    };
    RequestBuilder.prototype.urlParameters = function (value) {
        this._urlParameters = value;
        return this;
    };
    RequestBuilder.prototype.host = function (value) {
        this._host = value;
        return this;
    };
    RequestBuilder.prototype.headers = function (value) {
        this._headers = value;
        return this;
    };
    RequestBuilder.prototype.body = function (value) {
        this._body = value instanceof RequestBody_1.RequestBody ? value :
            typeof value === 'string' ? RequestBody_1.RequestBody.fromString(value) :
                RequestBody_1.RequestBody.fromData(value);
        return this;
    };
    RequestBuilder.prototype.build = function () {
        return new Request_1.Request(this._url, this._method, this._urlParameters, this._host, this._headers, this._body);
    };
    return RequestBuilder;
}());
exports.RequestBuilder = RequestBuilder;
