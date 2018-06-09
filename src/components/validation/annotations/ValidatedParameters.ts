import {applyMiddleware} from '../../annotations/aop'
import {ValidatorData} from '../types'
import {ClassAnnotationsStore} from '../../annotations/ClassAnnotationsStore'
import {container} from '../../../framework/globalContainer'
import {Validator} from '../Validator'
import {Validator as ValidatorAnnotation} from './Validator'
import {AnnotationsServiceName, ValidationServiceName} from '../../../framework/services'

// Validates method parameters
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