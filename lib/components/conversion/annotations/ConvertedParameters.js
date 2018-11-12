import { applyMiddleware } from '../../annotations/aop';
import { container } from '../../../framework/globalContainer';
import { AnnotationsServiceName, ConversionServiceName } from '../../../framework/services';
import { Convert as ConverterAnnotation } from '../annotations/converters';
/**
 * Converts method parameters.
 */
export function ConvertedParameters() {
    return (target, method, descriptor) => {
        const classAnnotationsStore = container.get(AnnotationsServiceName.ClassAnnotationsStore);
        const converter = container.get(ConversionServiceName.Converter);
        classAnnotationsStore.addMethodAnnotation(target.constructor, method, ConvertedParameters, {});
        applyMiddleware(descriptor, (next, args) => {
            args = args.map((arg, index) => {
                const convertersData = classAnnotationsStore
                    .getMethodParameterAnnotations(target.constructor, method, index, ConverterAnnotation)
                    .map(i => i.data);
                return converter.convert(arg, convertersData);
            });
            return next(args);
        });
    };
}
