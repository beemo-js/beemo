import {Converter} from '../Converter'
import {ClassAnnotationsStore} from '../../annotations/ClassAnnotationsStore'
import {applyMiddleware} from '../../annotations/aop'
import {container} from '../../../framework/globalContainer'
import {AnnotationsServiceName, ConversionServiceName} from '../../../framework/services'
import {ConverterData} from '../types'
import {Convert as ConverterAnnotation} from '../annotations/converters'

/**
 * Converts method parameters.
 */
export function ConvertedParameters(): MethodDecorator {
    return (target: any, method: string, descriptor: PropertyDescriptor) => {
        const classAnnotationsStore = container.get<ClassAnnotationsStore>(AnnotationsServiceName.ClassAnnotationsStore)
        const converter = container.get<Converter>(ConversionServiceName.Converter)

        classAnnotationsStore.addMethodAnnotation(target.constructor, method, ConvertedParameters, {})

        applyMiddleware(descriptor, (next, args) => {
            args = args.map((arg, index) => {
                const convertersData = classAnnotationsStore
                    .getMethodParameterAnnotations(target.constructor, method, index, ConverterAnnotation)
                    .map(i => i.data as ConverterData)

                return converter.convert(arg, convertersData)
            })

            return next(args)
        })
    }
}