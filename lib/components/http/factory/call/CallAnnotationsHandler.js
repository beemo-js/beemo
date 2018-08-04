"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("../..");
/**
 * Fills the call returned from method in call factory with data in parameters.
 */
var CallAnnotationsHandler = /** @class */ (function () {
    function CallAnnotationsHandler(classAnnotationsStore, normalizer) {
        this.classAnnotationsStore = classAnnotationsStore;
        this.normalizer = normalizer;
    }
    /**
     * Fills the call returned from method with data in parameters.
     */
    CallAnnotationsHandler.prototype.handle = function (call, classFn, method, args) {
        this.setBody(call, classFn, method, args);
        this.setUrlParams(call, classFn, method, args);
        this.setHeaders(call, classFn, method, args);
    };
    CallAnnotationsHandler.prototype.setBody = function (call, classFn, method, args) {
        var _this = this;
        this.fillFromAnnotations(call, classFn, method, args, __1.Body, function (call, arg, body) {
            call.request.body = __1.RequestBody.fromData(_this.normalizer.normalize(body['data']['classFn'], arg));
        });
    };
    CallAnnotationsHandler.prototype.setUrlParams = function (call, classFn, method, args) {
        this.fillFromAnnotations(call, classFn, method, args, __1.UrlParam, function (call, arg, urlParam) {
            call.request.urlParameters[urlParam['data']['name']] = arg.toString();
        });
    };
    CallAnnotationsHandler.prototype.setHeaders = function (call, classFn, method, args) {
        this.fillFromAnnotations(call, classFn, method, args, __1.Header, function (call, arg, header) {
            call.request.headers[header['data']['name']] = arg.toString();
        });
    };
    CallAnnotationsHandler.prototype.fillFromAnnotations = function (call, classFn, method, args, annotation, filler) {
        var _this = this;
        args
            .map(function (arg, index) { return ([
            arg,
            _this.classAnnotationsStore.getMethodParameterAnnotations(classFn, method, index, annotation)
        ]); })
            .filter(function (_a) {
            var arg = _a[0], annotation = _a[1];
            return annotation.length > 0;
        })
            .map(function (_a) {
            var arg = _a[0], annotation = _a[1];
            return [arg, annotation[0]];
        })
            .forEach(function (_a) {
            var arg = _a[0], annotation = _a[1];
            return filler(call, arg, annotation);
        });
    };
    return CallAnnotationsHandler;
}());
exports.CallAnnotationsHandler = CallAnnotationsHandler;
