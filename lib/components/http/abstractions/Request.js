"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestBody_1 = require("./RequestBody");
/**
 * Abstraction of an HTTP request.
 */
var Request = /** @class */ (function () {
    function Request(url, method, urlParameters, host, headers, body) {
        if (url === void 0) { url = ''; }
        if (method === void 0) { method = 'GET'; }
        if (urlParameters === void 0) { urlParameters = {}; }
        if (host === void 0) { host = ''; }
        if (headers === void 0) { headers = {}; }
        if (body === void 0) { body = new RequestBody_1.RequestBody(); }
        this.url = url;
        this.method = method;
        this.urlParameters = urlParameters;
        this.host = host;
        this.headers = headers;
        this.body = body;
    }
    /**
     * Clone a request.
     */
    Request.clone = function (request) {
        return new Request(request.url, request.method, request.urlParameters, request.host, request.headers, request.body);
    };
    /**
     * Merge given requests from left to right.
     * - urls are concatenated
     * - url parameters, bodies and headers are merged
     * - the rest is overridden
     */
    Request.merge = function () {
        var requests = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            requests[_i] = arguments[_i];
        }
        return requests.reduce(function (base, request) {
            if (!request)
                return base;
            base.url = Request.mergeUrls(base.url, request.url);
            base.method = request.method || base.method;
            Object.assign(base.urlParameters, request.urlParameters);
            base.host = request.host.length ? request.host : base.host;
            Object.assign(base.headers, request.headers);
            base.body = RequestBody_1.RequestBody.merge(base.body, request.body);
            return base;
        }, new Request());
    };
    /**
     * Build request url from host, url and url params.
     */
    Request.prototype.getFinalUrl = function () {
        var url = Request.mergeUrls(this.host, this.url);
        var urlParams = this.getUrlParams();
        if (urlParams.length > 0) {
            url += "?" + urlParams;
        }
        return url;
    };
    /**
     * Builds the params part of the url.
     */
    Request.prototype.getUrlParams = function () {
        var params = [];
        for (var key in this.urlParameters) {
            params.push(encodeURIComponent(key) + "=" + encodeURIComponent(this.urlParameters[key]));
        }
        return params.join('&');
    };
    /**
     * Concatenate given urls.
     */
    Request.mergeUrls = function () {
        var urls = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            urls[_i] = arguments[_i];
        }
        return urls.reduce(function (base, url) {
            if (!base)
                return url;
            if (!url)
                return base;
            var result = base;
            // if base does not end with a /, add it
            if (base.substr(-1) !== '/') {
                result += '/';
            }
            // if url begins with a /, remove it
            if (url.substr(0, 1) === '/') {
                url = url.length ? url.substr(1) : '';
            }
            result += url;
            return result;
        });
    };
    return Request;
}());
exports.Request = Request;
