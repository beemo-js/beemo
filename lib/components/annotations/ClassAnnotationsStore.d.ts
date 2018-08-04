import { ClassMetadataStore } from '../metadata';
import { AnnotationData } from './types';
/**
 * Stores classes annotations (class, constructor, properties, methods and method parameters annotations).
 */
export declare class ClassAnnotationsStore {
    private classMetadata;
    /**
     * Key used for annotations in class metadata store.
     */
    private annotationsKey;
    constructor(classMetadata: ClassMetadataStore);
    getClassAnnotations(classFn: Function, type?: Function): AnnotationData[];
    addClassAnnotation(classFn: Function, type: Function, data: Object): void;
    getConstructorParameterAnnotations(classFn: Function, index: number, type?: Function): AnnotationData[];
    addConstructorParameterAnnotation(classFn: Function, index: number, type: Function, data: Object): void;
    getPropertyAnnotations(classFn: Function, propertyName: string, type?: Function): AnnotationData[];
    addPropertyAnnotation(classFn: Function, propertyName: string, type: Function, data: Object): void;
    getMethodAnnotations(classFn: Function, methodName: string, type?: Function): AnnotationData[];
    addMethodAnnotation(classFn: Function, methodName: string, type: Function, data: Object): void;
    getMethodParameterAnnotations(classFn: Function, methodName: string, index: number, type?: Function): AnnotationData[];
    addMethodParameterAnnotation(classFn: Function, methodName: string, index: number, type: Function, data: Object): void;
    /**
     * Get the list of annotations in obj or create an empty one.
     * If type is provided, only get the annotations having given type.
     */
    private getObjectAnnotations(obj, type?);
}
