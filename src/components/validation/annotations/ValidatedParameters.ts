import {ValidatorData} from '../types'
import {Validator} from '../Validator'
import {Constraints as ValidatorAnnotation} from './constraints'
import {container} from '../../../framework/globalContainer'
import {ClassAnnotationsStore} from '../../annotations/ClassAnnotationsStore'
import {AnnotationsServiceName, ValidationServiceName} from '../../../framework/services'
import {applyMiddleware} from '../../annotations/aop'

/**
 * Validates method parameters.
 */
export function ValidatedParameters(): MethodDecorator {
    return (target: any, method: string, descriptor: PropertyDescriptor) => {
        const classAnnotationsStore = container.get<ClassAnnotationsStore>(AnnotationsServiceName.ClassAnnotationsStore)
        const validator = container.get<Validator>(ValidationServiceName.Validator)

        classAnnotationsStore.addMethodAnnotation(target.constructor, method, ValidatedParameters, {})

        applyMiddleware(descriptor, (next, args) => {
            args.forEach((arg, index) => {
                const validatorsData = classAnnotationsStore
                    .getMethodParameterAnnotations(target.constructor, method, index, ValidatorAnnotation)
                    .map(i => i.data as ValidatorData)

                const errors = validator.validate(arg, validatorsData)

                if (errors.length > 0) {
                    throw `Invalid argument: ${errors[0].message}`
                }
            })

            return next(args)
        })
    }
}