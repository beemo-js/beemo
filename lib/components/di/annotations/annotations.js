"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Register a service to the container
var framework_1 = require("../../../framework");
/**
 * Declares annotated class as a service (i.e. registers it in services container).
 * @param id Name of the service; if not provided it will be accessed via its constructor.
 */
function Service(id) {
    return function (target) {
        framework_1.container.get(framework_1.DiServiceName.ReflectionServiceManager).registerService(target, id);
    };
}
exports.Service = Service;
/**
 * Registers a constructor param dependency.
 */
function Inject(id) {
    return function (target, _, index) {
        framework_1.container.get(framework_1.DiServiceName.ReflectionServiceManager).addConstructorParameterDependency(target.constructor, index, id);
    };
}
exports.Inject = Inject;
/**
 * Registers a constructor param value configuration key.
 * The value will be retrieved from configuration.
 */
function FromConfig(key) {
    return function (target, _, index) {
        framework_1.container.get(framework_1.DiServiceName.ReflectionServiceManager).addConstructorParameterConfigDependency(target.constructor, index, key);
    };
}
exports.FromConfig = FromConfig;
