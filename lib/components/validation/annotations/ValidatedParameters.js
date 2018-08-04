"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var annotations_1 = require("../../annotations");
var framework_1 = require("../../../framework");
var constraints_1 = require("./constraints");
/**
 * Validates method parameters.
 */
function ValidatedParameters() {
    return function (target, method, descriptor) {
        var classAnnotationsStore = framework_1.container.get(framework_1.AnnotationsServiceName.ClassAnnotationsStore);
        var validator = framework_1.container.get(framework_1.ValidationServiceName.Validator);
        classAnnotationsStore.addMethodAnnotation(target.constructor, method, ValidatedParameters, {});
        annotations_1.applyMiddleware(descriptor, function (next, args) {
            args.forEach(function (arg, index) {
                var validatorsData = classAnnotationsStore
                    .getMethodParameterAnnotations(target.constructor, method, index, constraints_1.Constraints)
                    .map(function (i) { return i.data; });
                var errors = validator.validate(arg, validatorsData);
                if (errors.length > 0) {
                    throw "Invalid argument: " + errors[0].message;
                }
            });
            return next(args);
        });
    };
}
exports.ValidatedParameters = ValidatedParameters;
