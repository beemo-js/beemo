"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
// Target can come only from an annotation
var ReflectionClassTypesStore = /** @class */ (function () {
    function ReflectionClassTypesStore(classTypesStore) {
        this.classTypesStore = classTypesStore;
    }
    // Constructor parameters
    ReflectionClassTypesStore.prototype.getConstructorParametersTypes = function (classFn) {
        var _this = this;
        var paramTypes = Reflect.getMetadata('design:paramtypes', classFn) || [];
        paramTypes.forEach(function (type, index) { _this.setConstructorParameterType(classFn, index, type, false); });
        return this.classTypesStore.getConstructorParametersTypes(classFn);
    };
    ReflectionClassTypesStore.prototype.getConstructorParameterType = function (classFn, paramIndex) {
        var foundType = this.classTypesStore.getConstructorParameterType(classFn, paramIndex);
        return foundType || this.getConstructorParametersTypes(classFn)[paramIndex];
    };
    ReflectionClassTypesStore.prototype.setConstructorParameterType = function (classFn, paramIndex, type, replaceIfExists) {
        if (replaceIfExists === void 0) { replaceIfExists = true; }
        this.classTypesStore.setConstructorParameterType(classFn, paramIndex, type, replaceIfExists);
    };
    // Property type
    ReflectionClassTypesStore.prototype.getPropertyType = function (target, property) {
        var reflectedType = Reflect.getMetadata('design:type', target, property) || Object;
        this.classTypesStore.setPropertyType(target.constructor, property, reflectedType, false);
        return this.classTypesStore.getPropertyType(target.constructor, property);
    };
    ReflectionClassTypesStore.prototype.setPropertyType = function (target, property, type, replaceIfExists) {
        if (replaceIfExists === void 0) { replaceIfExists = true; }
        this.classTypesStore.setPropertyType(target.constructor, property, type, replaceIfExists);
    };
    // Method return type
    ReflectionClassTypesStore.prototype.getMethodType = function (target, method) {
        var reflectedType = Reflect.getMetadata('design:returntype', target, method) || Object;
        this.classTypesStore.setMethodReturnType(target.constructor, method, reflectedType, false);
        return this.classTypesStore.getMethodReturnType(target.constructor, method);
    };
    ReflectionClassTypesStore.prototype.setMethodType = function (target, method, type, replaceIfExists) {
        if (replaceIfExists === void 0) { replaceIfExists = true; }
        this.classTypesStore.setMethodReturnType(target.constructor, method, type, replaceIfExists);
    };
    // Method parameters types
    ReflectionClassTypesStore.prototype.getMethodParametersTypes = function (target, method) {
        var _this = this;
        var paramTypes = Reflect.getMetadata('design:paramtypes', target, method) || [];
        paramTypes.forEach(function (type, index) { _this.setMethodParameterType(target.constructor, method, index, type, false); });
        return this.classTypesStore.getMethodParametersTypes(target.constructor, method);
    };
    ReflectionClassTypesStore.prototype.getMethodParameterType = function (target, method, paramIndex) {
        var foundType = this.classTypesStore.getMethodParameterType(target.constructor, method, paramIndex);
        return foundType || this.getMethodParametersTypes(target, method)[paramIndex];
    };
    ReflectionClassTypesStore.prototype.setMethodParameterType = function (target, method, paramIndex, type, replaceIfExists) {
        if (replaceIfExists === void 0) { replaceIfExists = true; }
        this.classTypesStore.setMethodParameterType(target.constructor, method, paramIndex, type, replaceIfExists);
    };
    return ReflectionClassTypesStore;
}());
exports.ReflectionClassTypesStore = ReflectionClassTypesStore;
