"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var annotations_1 = require("../../annotations");
var framework_1 = require("../../../framework");
/**
 * Converts method parameters.
 */
function ConvertedParameters() {
    return function (target, method, descriptor) {
        var classAnnotationsStore = framework_1.container.get(framework_1.AnnotationsServiceName.ClassAnnotationsStore);
        var converter = framework_1.container.get(framework_1.ConversionServiceName.Converter);
        classAnnotationsStore.addMethodAnnotation(target.constructor, method, ConvertedParameters, {});
        annotations_1.applyMiddleware(descriptor, function (next, args) {
            args = args.map(function (arg, index) {
                var convertersData = classAnnotationsStore
                    .getMethodParameterAnnotations(target.constructor, method, index, __1.Convert)
                    .map(function (i) { return i.data; });
                return converter.convert(arg, convertersData);
            });
            return next(args);
        });
    };
}
exports.ConvertedParameters = ConvertedParameters;
