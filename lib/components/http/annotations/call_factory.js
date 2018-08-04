"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var annotations_1 = require("../../annotations");
var framework_1 = require("../../../framework");
/**
 * Fills the call returned from method with data in parameters.
 */
function HandledCall() {
    return function (target, propertyKey, descriptor) {
        annotations_1.applyMiddleware(descriptor, function (next, args) {
            var call = next(args);
            framework_1.container.get(framework_1.HttpServiceName.CallAnnotationsHandler)
                .handle(call, target.constructor, propertyKey, args);
            return call;
        });
    };
}
exports.HandledCall = HandledCall;
/**
 * Maps given parameter to call request's body.
 *
 * @param classFn class to refer to when serializing the parameter.
 */
function Body(classFn) {
    return function (target, propertyKey, parameterIndex) {
        framework_1.container.get(framework_1.AnnotationsServiceName.ClassAnnotationsStore)
            .addMethodParameterAnnotation(target.constructor, propertyKey, parameterIndex, Body, { classFn: classFn });
    };
}
exports.Body = Body;
/**
 * Maps given parameter to call request's url parameters.
 */
function UrlParam(name) {
    return function (target, propertyKey, parameterIndex) {
        framework_1.container.get(framework_1.AnnotationsServiceName.ClassAnnotationsStore)
            .addMethodParameterAnnotation(target.constructor, propertyKey, parameterIndex, UrlParam, { name: name });
    };
}
exports.UrlParam = UrlParam;
/**
 * Maps given parameter to call request's headers.
 */
function Header(name) {
    return function (target, propertyKey, parameterIndex) {
        framework_1.container.get(framework_1.AnnotationsServiceName.ClassAnnotationsStore)
            .addMethodParameterAnnotation(target.constructor, propertyKey, parameterIndex, Header, { name: name });
    };
}
exports.Header = Header;
