"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var conversion_1 = require("../../conversion");
var validation_1 = require("../../validation");
/**
 * Handle method parameters converters and validators.
 */
function HandledParameters() {
    return function (target, method, descriptor) {
        validation_1.ValidatedParameters()(target, method, descriptor);
        conversion_1.ConvertedParameters()(target, method, descriptor);
    };
}
exports.HandledParameters = HandledParameters;
