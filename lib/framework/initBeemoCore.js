"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var initContainer_1 = require("./initContainer");
var conversion_1 = require("../components/conversion");
var globalContainer_1 = require("./globalContainer");
var services_1 = require("./services");
var validation_1 = require("../components/validation");
function initBeemoCore() {
    initContainer_1.initContainer();
    conversion_1.registerConverters(globalContainer_1.container.get(services_1.ConversionServiceName.Converter));
    validation_1.registerValidators(globalContainer_1.container.get(services_1.ValidationServiceName.Validator));
}
exports.initBeemoCore = initBeemoCore;
