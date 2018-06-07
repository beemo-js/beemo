import {ValidatorData} from '../types'
import {container} from '../../framework/globalContainer'
import {ClassAnnotationsStore} from '../../annotations/ClassAnnotationsStore'
import {Validator} from './Validator'
import {AnnotationsServiceName} from '../../framework/services'

// Adds a property / method param annotation
export function addAnnotation(target: any, key: string, index: number, data: ValidatorData): void {
    const classAnnotationsStore = container.get<ClassAnnotationsStore>(AnnotationsServiceName.ClassAnnotationsStore)

    if (index === undefined) {
        // property
        classAnnotationsStore.addPropertyAnnotation(target.constructor, key, Validator, data)
    } else {
        // method parameter
        classAnnotationsStore.addMethodParameterAnnotation(target.constructor, key, index, Validator, data)
    }
}
