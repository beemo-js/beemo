"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var framework_1 = require("../../../framework");
// Returns a validator annotation (parameter or property decorator)
function typeAnnotation(type) {
    return function (target, key, index) {
        var classAnnotationsStore = framework_1.container.get(framework_1.AnnotationsServiceName.ClassAnnotationsStore);
        var classTypesStore = framework_1.container.get(framework_1.TypesServiceName.ClassTypesStore);
        if (index === undefined) {
            // property
            classAnnotationsStore.addPropertyAnnotation(target.constructor, key, exports.Type, { type: type });
            classTypesStore.setPropertyType(target.constructor, key, type);
        }
        else {
            // method parameter
            classAnnotationsStore.addMethodParameterAnnotation(target.constructor, key, index, exports.Type, { type: type });
            classTypesStore.setMethodParameterType(target.constructor, key, index, type);
        }
    };
}
exports.Type = function (type) { return typeAnnotation(type); };
function ReturnType(type) {
    return function (target, key, decorator) {
        var classAnnotationsStore = framework_1.container.get(framework_1.AnnotationsServiceName.ClassAnnotationsStore);
        var classTypesStore = framework_1.container.get(framework_1.TypesServiceName.ClassTypesStore);
        classAnnotationsStore.addMethodAnnotation(target.constructor, key, ReturnType, { type: type });
        classTypesStore.setMethodReturnType(target.constructor, key, type);
    };
}
exports.ReturnType = ReturnType;
