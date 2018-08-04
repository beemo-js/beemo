"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var build = function (id, args) {
    if (args === void 0) { args = {}; }
    return ({ id: id, args: args });
};
// Global
exports.typed = function (type) { return build('typed', { type: type }); };
exports.notNull = function () { return build('not_null'); };
// Numbers
exports.min = function (lowerBound) { return build('min', { lowerBound: lowerBound }); };
exports.max = function (upperBound) { return build('max', { upperBound: upperBound }); };
exports.between = function (lowerBound, upperBound) { return build('between', { lowerBound: lowerBound, upperBound: upperBound }); };
exports.positive = function () { return build('positive'); };
exports.positiveOrZero = function () { return build('positive_or_zero'); };
exports.negative = function () { return build('negative'); };
exports.negativeOrZero = function () { return build('negative_or_zero'); };
// Strings
exports.pattern = function (pattern) { return build('pattern', { pattern: new RegExp(pattern) }); };
exports.email = function () { return build('email'); };
exports.url = function () { return build('url'); };
// Arrays
exports.notEmpty = function () { return build('not_empty'); };
exports.length = function (length) { return build('length', { length: length }); };
exports.minLength = function (length) { return build('min_length', { length: length }); };
exports.maxLength = function (length) { return build('max_length', { length: length }); };
exports.lengthBetween = function (minLength, maxLength) { return build('length_between', { minLength: minLength, maxLength: maxLength }); };
// Dates
exports.past = function (from) { return build('past', { from: from }); };
exports.future = function (from) { return build('future', { from: from }); };
// Classes
exports.valid = function (classFn) { return build('valid', { classFn: classFn }); };
