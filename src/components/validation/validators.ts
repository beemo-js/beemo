import {Validator} from './Validator'
import {NameResolver} from '../metadata/NameResolver'

export function registerValidators(
    validator: Validator,
    nameResolver: NameResolver
) {

    validator.registerValidator(
        'higher_than',
        (value, {lowerBound}) => value > lowerBound,
        (value, {lowerBound}) => `Value should be higher than ${lowerBound} (value given: ${value})`
    )

    validator.registerValidator(
        'typed',
        (value, {type}) => value.constructor === type,
        (value, {type}) => `Value should be of type ${type.name} (value given: ${value.constructor.name})`
    )

    validator.registerValidator(
        'validated',
        (value, {classFn}) => {
            return validator.validateClassInstance(value, classFn).length === 0
        },
        (value, {classFn}) => `Value does not pass validation of class ${nameResolver.findName(classFn)}`
    )

}
