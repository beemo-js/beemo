"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var build = function (id, args) {
    if (args === void 0) { args = {}; }
    return ({ id: id, args: args });
};
// Global
exports.defaultTo = function (value) { return build('default_to', { value: value }); };
// Numbers
exports.round = function () { return build('round'); };
exports.floor = function () { return build('floor'); };
exports.ceil = function () { return build('ceil'); };
// Strings
exports.lowerCase = function () { return build('lower_case'); };
exports.upperCase = function () { return build('upper_case'); };
exports.trim = function () { return build('trim'); };
exports.replace = function (pattern, replacement) { return build('replace', { pattern: pattern, replacement: replacement }); };
exports.encodeUrl = function () { return build('encode_url'); };
exports.encodeUrlComponent = function () { return build('encode_url_component'); };
exports.decodeUrl = function () { return build('decode_url'); };
exports.decodeUrlComponent = function () { return build('decode_url_component'); };
// Arrays
exports.sort = function (reverse) {
    if (reverse === void 0) { reverse = false; }
    return build('sort', { reverse: reverse });
};
exports.reverse = function () { return build('reverse'); };
