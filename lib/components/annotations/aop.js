"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Apply given middleware to function described by descriptor.
 */
function applyMiddleware(descriptor, middleware) {
    var originalFunction = descriptor.value;
    descriptor.value = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var next = function (args) { return originalFunction.apply(_this, args); };
        return middleware(next, args);
    };
}
exports.applyMiddleware = applyMiddleware;
/**
 * Return an AOP annotation that applies given middleware to annotated method.
 */
function aopAnnotation(middleware) {
    return function (target, propertyKey, descriptor) {
        applyMiddleware(descriptor, middleware);
    };
}
exports.aopAnnotation = aopAnnotation;
