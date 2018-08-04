"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var builders_1 = require("../builders");
var framework_1 = require("../../../framework");
// Annotation to property or method
function addAnnotation(target, key, index, data) {
    var classAnnotationsStore = framework_1.container.get(framework_1.AnnotationsServiceName.ClassAnnotationsStore);
    if (index === undefined) {
        // property
        classAnnotationsStore.addPropertyAnnotation(target.constructor, key, exports.Constraints, data);
    }
    else {
        // method parameter
        classAnnotationsStore.addMethodParameterAnnotation(target.constructor, key, index, exports.Constraints, data);
    }
}
// Returns a validator annotation
exports.Constraints = function (data) { return function (target, key, index) { return addAnnotation(target, key, index, data); }; };
// Global
exports.Typed = function (type) { return exports.Constraints(builders_1.typed(type)); };
exports.NotNull = function () { return exports.Constraints(builders_1.notNull()); };
// Numbers
exports.Min = function (lowerBound) { return exports.Constraints(builders_1.min(lowerBound)); };
exports.Max = function (upperBound) { return exports.Constraints(builders_1.max(upperBound)); };
exports.Between = function (lowerBound, upperBound) { return exports.Constraints(builders_1.between(lowerBound, upperBound)); };
exports.Positive = function () { return exports.Constraints(builders_1.positive()); };
exports.PositiveOrZero = function () { return exports.Constraints(builders_1.positiveOrZero()); };
exports.Negative = function () { return exports.Constraints(builders_1.negative()); };
exports.NegativeOrZero = function () { return exports.Constraints(builders_1.negativeOrZero()); };
// Strings
exports.Pattern = function (p) { return exports.Constraints(builders_1.pattern(p)); };
exports.Email = function () { return exports.Constraints(builders_1.email()); };
exports.Url = function () { return exports.Constraints(builders_1.url()); };
// Arrays
exports.NotEmpty = function () { return exports.Constraints(builders_1.notEmpty()); };
exports.Length = function (l) { return exports.Constraints(builders_1.length(l)); };
exports.MinLength = function (length) { return exports.Constraints(builders_1.minLength(length)); };
exports.MaxLength = function (length) { return exports.Constraints(builders_1.maxLength(length)); };
exports.LengthBetween = function (minLength, maxLength) { return exports.Constraints(builders_1.lengthBetween(minLength, maxLength)); };
// Dates
exports.Past = function (from) { return exports.Constraints(builders_1.past(from)); };
exports.Future = function (from) { return exports.Constraints(builders_1.future(from)); };
// Classes
exports.Valid = function (classFn) { return function (target, key, index) {
    var reflectionClassTypesStore = framework_1.container.get(framework_1.TypesServiceName.ReflectionClassTypesStore);
    classFn = classFn || (index === undefined ?
        reflectionClassTypesStore.getPropertyType(target.constructor, key) :
        reflectionClassTypesStore.getMethodParameterType(target.constructor, key, index));
    if (!classFn) {
        throw "@Validated annotation must be used on variable with known type.";
    }
    addAnnotation(target, key, index, builders_1.valid(classFn));
}; };
