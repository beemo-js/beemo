"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var framework_1 = require("../../../framework");
var __1 = require("..");
/**
 * Returns a converter annotation.
 */
exports.Convert = function (data) { return function (target, key, index) {
    var classAnnotationsStore = framework_1.container.get(framework_1.AnnotationsServiceName.ClassAnnotationsStore);
    if (index === undefined) {
        // property
        classAnnotationsStore.addPropertyAnnotation(target.constructor, key, exports.Convert, data);
    }
    else {
        // method parameter
        classAnnotationsStore.addMethodParameterAnnotation(target.constructor, key, index, exports.Convert, data);
    }
}; };
// Global
exports.DefaultTo = function (value) { return exports.Convert(__1.defaultTo(value)); };
// Numbers
exports.Round = function () { return exports.Convert(__1.round()); };
exports.Floor = function () { return exports.Convert(__1.floor()); };
exports.Ceil = function () { return exports.Convert(__1.ceil()); };
// Strings
exports.LowerCase = function () { return exports.Convert(__1.lowerCase()); };
exports.UpperCase = function () { return exports.Convert(__1.upperCase()); };
exports.Trim = function () { return exports.Convert(__1.trim()); };
exports.Replace = function (pattern, replacement) { return exports.Convert(__1.replace(pattern, replacement)); };
exports.UrlEncode = function () { return exports.Convert(__1.encodeUrl()); };
exports.UrlEncodeComponent = function () { return exports.Convert(__1.encodeUrlComponent()); };
exports.UrlDecode = function () { return exports.Convert(__1.decodeUrl()); };
exports.UrlDecodeComponent = function () { return exports.Convert(__1.decodeUrlComponent()); };
// Arrays
exports.Sort = function (reverse) {
    if (reverse === void 0) { reverse = false; }
    return exports.Convert(__1.sort(reverse));
};
exports.Reverse = function () { return exports.Convert(__1.reverse()); };
