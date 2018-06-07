import {ConverterData} from '../types'
import {container} from '../../framework/globalContainer'
import {ClassAnnotationsStore} from '../../annotations/ClassAnnotationsStore'
import {AnnotationsServiceName} from '../../framework/services'

// Returns a converter annotation
export function Converter(data: ConverterData): ParameterDecorator|PropertyDecorator {
    return (target: any, key: string, index?: number) => {
        const classAnnotationsStore = container.get<ClassAnnotationsStore>(AnnotationsServiceName.ClassAnnotationsStore)

        if (index === undefined) {
            // property
            classAnnotationsStore.addPropertyAnnotation(target.constructor, key, Converter, data)
        } else {
            // method parameter
            classAnnotationsStore.addMethodParameterAnnotation(target.constructor, key, index, Converter, data)
        }
    }
}