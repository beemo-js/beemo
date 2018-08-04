"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("../..");
/**
 * Builds Call instances.
 */
var CallFactory = /** @class */ (function () {
    function CallFactory(baseCall) {
        if (baseCall === void 0) { baseCall = new __1.Call(); }
        this.baseCall = baseCall;
    }
    CallFactory.prototype.buildRequestCall = function (url, method) {
        var call = __1.Call.clone(this.baseCall);
        call.request = __1.Request.merge(this.baseCall.request, new __1.Request(url, method));
        return call;
    };
    CallFactory.prototype.get = function (url) {
        if (url === void 0) { url = ''; }
        return this.buildRequestCall(url, 'GET');
    };
    CallFactory.prototype.post = function (url) {
        if (url === void 0) { url = ''; }
        return this.buildRequestCall(url, 'POST');
    };
    CallFactory.prototype.put = function (url) {
        if (url === void 0) { url = ''; }
        return this.buildRequestCall(url, 'PUT');
    };
    CallFactory.prototype.patch = function (url) {
        if (url === void 0) { url = ''; }
        return this.buildRequestCall(url, 'PATCH');
    };
    CallFactory.prototype.delete = function (url) {
        if (url === void 0) { url = ''; }
        return this.buildRequestCall(url, 'DELETE');
    };
    return CallFactory;
}());
exports.CallFactory = CallFactory;
