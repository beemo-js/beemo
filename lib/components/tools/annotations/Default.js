"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var annotations_1 = require("../../annotations");
/**
 * If returned value is null, return default one instead.
 */
function Default(fn) {
    return annotations_1.aopAnnotation(function (next, args) {
        var result = next(args);
        if (result === undefined || result === null) {
            return fn(args);
        }
        return result;
    });
}
exports.Default = Default;
