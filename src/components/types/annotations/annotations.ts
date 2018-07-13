import {container, AnnotationsServiceName, TypesServiceName} from '../../../framework'
import {ClassAnnotationsStore} from '../../annotations'
import {ClassTypesStore} from '../ClassTypesStore'

// Returns a validator annotation (parameter or property decorator)
function typeAnnotation(type: Function): any {
    return (target: any, key: string, index?: number) => {
        const classAnnotationsStore = container.get<ClassAnnotationsStore>(AnnotationsServiceName.ClassAnnotationsStore)
        const classTypesStore = container.get<ClassTypesStore>(TypesServiceName.ClassTypesStore)

        if (index === undefined) {
            // property
            classAnnotationsStore.addPropertyAnnotation(target.constructor, key, Type, {type})
            classTypesStore.setPropertyType(target.constructor, key, type)
        } else {
            // method parameter
            classAnnotationsStore.addMethodParameterAnnotation(target.constructor, key, index, Type, {type})
            classTypesStore.setMethodParameterType(target.constructor, key, index, type)
        }
    }
}

export const Type = (type: Function) => typeAnnotation(type)

export function ReturnType(type: Function): any {
    return (target: any, key: string, decorator: any) => {
        const classAnnotationsStore = container.get<ClassAnnotationsStore>(AnnotationsServiceName.ClassAnnotationsStore)
        const classTypesStore = container.get<ClassTypesStore>(TypesServiceName.ClassTypesStore)

        classAnnotationsStore.addMethodAnnotation(target.constructor, key, ReturnType, {type})
        classTypesStore.setMethodReturnType(target.constructor, key, type)
    }
}