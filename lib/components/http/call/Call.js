"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
/**
 * Represents a resource that can be accessed via an HTTP request.
 */
var Call = /** @class */ (function () {
    function Call(
    /**
     * The class representing the resource.
     */
    classFn) {
        if (classFn === void 0) { classFn = Object; }
        this.classFn = classFn;
        /**
         * Formats the HTTP response's body to get the data to denormalize.
         * By default, returns the entire data.
         */
        this.responseFormatter = function (responseBody) { return responseBody; };
        /**
         * Has the value been retrieved?
         */
        this.retrieved = false;
        this.retrieved = false;
    }
    Call.merge = function () {
        var calls = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            calls[_i] = arguments[_i];
        }
        return calls.reduce(function (base, call) {
            if (!call)
                return base;
            base.value = call.value || base.value;
            base.request = __1.Request.merge(base.request, call.request);
            base.retrieved = call.retrieved || base.retrieved;
            base.classFn = call.classFn == Object ? call.classFn : base.classFn;
            return base;
        }, new Call());
    };
    Call.clone = function (call) {
        var result = new Call();
        result.classFn = call.classFn;
        result.value = call.value;
        result.request = call.request;
        result.responseFormatter = call.responseFormatter;
        result.retrieved = call.retrieved;
        return result;
    };
    /**
     * Construct a call from given request.
     */
    Call.fromRequest = function (request, classFn, responseFormatter) {
        if (classFn === void 0) { classFn = Object; }
        if (responseFormatter === void 0) { responseFormatter = function (responseBody) { return responseBody; }; }
        var liveData = new Call(classFn);
        liveData.request = request;
        liveData.responseFormatter = responseFormatter;
        liveData.retrieved = false;
        return liveData;
    };
    /**
     * Construct a call directly from resource value.
     */
    Call.fromValue = function (value, classFn) {
        if (classFn === void 0) { classFn = Object; }
        var liveData = new Call(classFn);
        liveData.value = value;
        liveData.retrieved = true;
        return liveData;
    };
    /**
     * Get the resource value, if available.
     */
    Call.prototype.get = function () {
        if (!this.retrieved) {
            throw 'Value not yet retrieved';
        }
        return this.value;
    };
    /**
     * Set the resource value.
     */
    Call.prototype.set = function (value) {
        this.value = value;
        this.retrieved = true;
    };
    return Call;
}());
exports.Call = Call;
