"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var ClassTypesStore = /** @class */ (function () {
    function ClassTypesStore(classMetadataStore) {
        this.classMetadataStore = classMetadataStore;
    }
    // Constructor parameters
    ClassTypesStore.prototype.getConstructorParametersTypes = function (classFn) {
        var parametersData = this.classMetadataStore.getConstructorParametersData(classFn);
        var types = [];
        for (var paramIndex in parametersData) {
            types.push(this.getConstructorParameterType(classFn, parseInt(paramIndex, 10)));
        }
        return types;
    };
    ClassTypesStore.prototype.getConstructorParameterType = function (classFn, paramIndex) {
        return this.getObjectType(this.classMetadataStore.getConstructorParameterData(classFn, paramIndex));
    };
    ClassTypesStore.prototype.setConstructorParameterType = function (classFn, paramIndex, type, replaceIfExists) {
        if (replaceIfExists === void 0) { replaceIfExists = true; }
        var base = this.classMetadataStore.getConstructorParameterData(classFn, paramIndex);
        this.setObjectType(base, type, replaceIfExists);
    };
    // Property type
    ClassTypesStore.prototype.getPropertyType = function (classFn, property) {
        return this.getObjectType(this.classMetadataStore.getPropertyData(classFn, property));
    };
    ClassTypesStore.prototype.setPropertyType = function (classFn, property, type, replaceIfExists) {
        if (replaceIfExists === void 0) { replaceIfExists = true; }
        var base = this.classMetadataStore.getPropertyData(classFn, property);
        this.setObjectType(base, type, replaceIfExists);
    };
    // Method return type
    ClassTypesStore.prototype.getMethodReturnType = function (classFn, method) {
        return this.getObjectType(this.classMetadataStore.getMethodData(classFn, method));
    };
    ClassTypesStore.prototype.setMethodReturnType = function (classFn, method, type, replaceIfExists) {
        if (replaceIfExists === void 0) { replaceIfExists = true; }
        var base = this.classMetadataStore.getMethodData(classFn, method);
        this.setObjectType(base, type, replaceIfExists);
    };
    // Method parameters types
    ClassTypesStore.prototype.getMethodParametersTypes = function (classFn, method) {
        var parametersData = this.classMetadataStore.getMethodParametersData(classFn, method);
        var types = [];
        for (var paramIndex in parametersData) {
            types.push(this.getMethodParameterType(classFn, method, parseInt(paramIndex, 10)));
        }
        return types;
    };
    ClassTypesStore.prototype.getMethodParameterType = function (classFn, method, paramIndex) {
        return this.getObjectType(this.classMetadataStore.getMethodParameterData(classFn, method, paramIndex));
    };
    ClassTypesStore.prototype.setMethodParameterType = function (classFn, method, paramIndex, type, replaceIfExists) {
        if (replaceIfExists === void 0) { replaceIfExists = true; }
        var base = this.classMetadataStore.getMethodParameterData(classFn, method, paramIndex);
        this.setObjectType(base, type, replaceIfExists);
    };
    // Helpers
    ClassTypesStore.prototype.getObjectType = function (obj) {
        return this.classMetadataStore.withDefault(obj, 'type', undefined);
    };
    ClassTypesStore.prototype.setObjectType = function (obj, type, replaceIfExists) {
        if (replaceIfExists || !obj['type']) {
            obj['type'] = type;
        }
    };
    return ClassTypesStore;
}());
exports.ClassTypesStore = ClassTypesStore;
