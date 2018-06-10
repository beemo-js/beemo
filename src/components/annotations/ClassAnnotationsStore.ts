import {ClassMetadataStore} from '../metadata/ClassMetadataStore'

interface AnnotationData {
    type: Function
    data: Object
}

export class ClassAnnotationsStore {

    private annotationsKey = 'annotations'

    constructor(
        private classMetadata: ClassMetadataStore
    ) {}

    // Class annotations

    getClassAnnotations(classFn: Function, type: Function = null): AnnotationData[] {
        return this.getObjectAnnotations(this.classMetadata.getClassData(classFn), type)
    }

    addClassAnnotation(classFn: Function, type: Function, data: Object): void {
        this.getClassAnnotations(classFn).unshift({ type, data })
    }

    // Constructor annotations

    getConstructorParameterAnnotations(classFn: Function, index: number, type: Function = null): AnnotationData[] {
        return this.getObjectAnnotations(this.classMetadata.getConstructorParameterData(classFn, index), type)
    }

    addConstructorParameterAnnotation(classFn: Function, index: number, type: Function, data: Object): void {
        this.getConstructorParameterAnnotations(classFn, index).unshift({ type, data })
    }

    // Properties annotations

    getPropertyAnnotations(classFn: Function, propertyName: string, type: Function = null): AnnotationData[] {
        return this.getObjectAnnotations(this.classMetadata.getPropertyData(classFn, propertyName), type)
    }

    addPropertyAnnotation(classFn: Function, propertyName: string, type: Function, data: Object): void {
        this.getPropertyAnnotations(classFn, propertyName).unshift({ type, data })
    }

    // Methods annotations

    getMethodAnnotations(classFn: Function, methodName: string, type: Function = null): AnnotationData[] {
        return this.getObjectAnnotations(this.classMetadata.getMethodData(classFn, methodName), type)
    }

    addMethodAnnotation(classFn: Function, methodName: string, type: Function, data: Object): void {
        this.getMethodAnnotations(classFn, methodName).unshift({ type, data })
    }

    // Methods parameters annotations

    getMethodParameterAnnotations(classFn: Function, methodName: string, index: number, type: Function = null): AnnotationData[] {
        return this.getObjectAnnotations(this.classMetadata.getMethodParameterData(classFn, methodName, index), type)
    }

    addMethodParameterAnnotation(classFn: Function, methodName: string, index: number, type: Function, data: Object): void {
        this.getMethodParameterAnnotations(classFn, methodName, index).unshift({ type, data })
    }

    private getObjectAnnotations(obj: Object, type: Function = null): AnnotationData[] {
        if (!obj[this.annotationsKey]) obj[this.annotationsKey] = []
        return type === null ?
            obj[this.annotationsKey]:
            obj[this.annotationsKey].filter(a => a.type === type)
    }
}
