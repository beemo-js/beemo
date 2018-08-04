"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Stores classes annotations (class, constructor, properties, methods and method parameters annotations).
 */
var ClassAnnotationsStore = /** @class */ (function () {
    function ClassAnnotationsStore(classMetadata) {
        this.classMetadata = classMetadata;
        /**
         * Key used for annotations in class metadata store.
         */
        this.annotationsKey = 'annotations';
    }
    // Class annotations
    ClassAnnotationsStore.prototype.getClassAnnotations = function (classFn, type) {
        if (type === void 0) { type = null; }
        return this.getObjectAnnotations(this.classMetadata.getClassData(classFn), type);
    };
    ClassAnnotationsStore.prototype.addClassAnnotation = function (classFn, type, data) {
        this.getClassAnnotations(classFn).unshift({ type: type, data: data });
    };
    // Constructor annotations
    ClassAnnotationsStore.prototype.getConstructorParameterAnnotations = function (classFn, index, type) {
        if (type === void 0) { type = null; }
        return this.getObjectAnnotations(this.classMetadata.getConstructorParameterData(classFn, index), type);
    };
    ClassAnnotationsStore.prototype.addConstructorParameterAnnotation = function (classFn, index, type, data) {
        this.getConstructorParameterAnnotations(classFn, index).unshift({ type: type, data: data });
    };
    // Properties annotations
    ClassAnnotationsStore.prototype.getPropertyAnnotations = function (classFn, propertyName, type) {
        if (type === void 0) { type = null; }
        return this.getObjectAnnotations(this.classMetadata.getPropertyData(classFn, propertyName), type);
    };
    ClassAnnotationsStore.prototype.addPropertyAnnotation = function (classFn, propertyName, type, data) {
        this.getPropertyAnnotations(classFn, propertyName).unshift({ type: type, data: data });
    };
    // Methods annotations
    ClassAnnotationsStore.prototype.getMethodAnnotations = function (classFn, methodName, type) {
        if (type === void 0) { type = null; }
        return this.getObjectAnnotations(this.classMetadata.getMethodData(classFn, methodName), type);
    };
    ClassAnnotationsStore.prototype.addMethodAnnotation = function (classFn, methodName, type, data) {
        this.getMethodAnnotations(classFn, methodName).unshift({ type: type, data: data });
    };
    // Methods parameters annotations
    ClassAnnotationsStore.prototype.getMethodParameterAnnotations = function (classFn, methodName, index, type) {
        if (type === void 0) { type = null; }
        return this.getObjectAnnotations(this.classMetadata.getMethodParameterData(classFn, methodName, index), type);
    };
    ClassAnnotationsStore.prototype.addMethodParameterAnnotation = function (classFn, methodName, index, type, data) {
        this.getMethodParameterAnnotations(classFn, methodName, index).unshift({ type: type, data: data });
    };
    /**
     * Get the list of annotations in obj or create an empty one.
     * If type is provided, only get the annotations having given type.
     */
    ClassAnnotationsStore.prototype.getObjectAnnotations = function (obj, type) {
        if (type === void 0) { type = null; }
        if (!obj[this.annotationsKey])
            obj[this.annotationsKey] = [];
        return type === null ?
            obj[this.annotationsKey] :
            obj[this.annotationsKey].filter(function (a) { return a.type === type; });
    };
    return ClassAnnotationsStore;
}());
exports.ClassAnnotationsStore = ClassAnnotationsStore;
