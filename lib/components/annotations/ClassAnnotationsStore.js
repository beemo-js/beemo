/**
 * Stores classes annotations (class, constructor, properties, methods and method parameters annotations).
 */
export class ClassAnnotationsStore {
    constructor(classMetadata) {
        this.classMetadata = classMetadata;
        /**
         * Key used for annotations in class metadata store.
         */
        this.annotationsKey = 'annotations';
    }
    // Class annotations
    getClassAnnotations(classFn, type = null) {
        return this.getObjectAnnotations(this.classMetadata.getClassData(classFn), type);
    }
    addClassAnnotation(classFn, type, data) {
        this.getClassAnnotations(classFn).unshift({ type, data });
    }
    // Constructor annotations
    getConstructorParameterAnnotations(classFn, index, type = null) {
        return this.getObjectAnnotations(this.classMetadata.getConstructorParameterData(classFn, index), type);
    }
    addConstructorParameterAnnotation(classFn, index, type, data) {
        this.getConstructorParameterAnnotations(classFn, index).unshift({ type, data });
    }
    // Properties annotations
    getPropertyAnnotations(classFn, propertyName, type = null) {
        return this.getObjectAnnotations(this.classMetadata.getPropertyData(classFn, propertyName), type);
    }
    addPropertyAnnotation(classFn, propertyName, type, data) {
        this.getPropertyAnnotations(classFn, propertyName).unshift({ type, data });
    }
    // Methods annotations
    getMethodAnnotations(classFn, methodName, type = null) {
        return this.getObjectAnnotations(this.classMetadata.getMethodData(classFn, methodName), type);
    }
    addMethodAnnotation(classFn, methodName, type, data) {
        this.getMethodAnnotations(classFn, methodName).unshift({ type, data });
    }
    // Methods parameters annotations
    getMethodParameterAnnotations(classFn, methodName, index, type = null) {
        return this.getObjectAnnotations(this.classMetadata.getMethodParameterData(classFn, methodName, index), type);
    }
    addMethodParameterAnnotation(classFn, methodName, index, type, data) {
        this.getMethodParameterAnnotations(classFn, methodName, index).unshift({ type, data });
    }
    /**
     * Get the list of annotations in obj or create an empty one.
     * If type is provided, only get the annotations having given type.
     */
    getObjectAnnotations(obj, type = null) {
        if (!obj[this.annotationsKey])
            obj[this.annotationsKey] = [];
        return type === null ?
            obj[this.annotationsKey] :
            obj[this.annotationsKey].filter(a => a.type === type);
    }
}
