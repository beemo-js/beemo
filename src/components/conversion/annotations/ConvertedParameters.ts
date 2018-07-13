import {ConverterData, Converter, Convert as ConverterAnnotation} from '..'
import {applyMiddleware, ClassAnnotationsStore} from '../../annotations'
import {container, AnnotationsServiceName, ConversionServiceName} from '../../../framework'

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