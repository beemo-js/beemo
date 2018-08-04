"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var initWebContainer_1 = require("./initWebContainer");
var framework_1 = require("../../../framework");
function initBeemoForWeb() {
    framework_1.initBeemoCore();
    initWebContainer_1.initWebContainer();
}
exports.initBeemoForWeb = initBeemoForWeb;
