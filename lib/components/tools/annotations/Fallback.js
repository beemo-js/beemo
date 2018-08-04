"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var annotations_1 = require("../../annotations");
/**
 * If called method throws an exception, return fallback instead.
 */
function Fallback(fn) {
    return annotations_1.aopAnnotation(function (next, args) {
        try {
            return next(args);
        }
        catch (e) {
            return fn(args);
        }
    });
}
exports.Fallback = Fallback;
