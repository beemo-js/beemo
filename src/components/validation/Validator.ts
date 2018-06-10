import {ValidatorType, ValidatorData, ValidatorError} from './types'
import {ClassAnnotationsStore} from '../annotations/ClassAnnotationsStore'
import {Constraints as ValidatorAnnotation} from './annotations/constraints'

export class Validator {
    private validators = {}

    constructor(
        private classAnnotationsStore: ClassAnnotationsStore
    ) {}

    registerValidator(validatorId: string, validator: ValidatorType, errorMessage: Function): void {
        this.validators[validatorId] = {
            validator,
            errorMessage
        }
    }

    validate(value: any, validatorsData: ValidatorData[]): ValidatorError[] {
        return validatorsData
            .map(validatorData => {
                const id = validatorData.id
                const validatorArgs = validatorData.args
                const validator = this.validators[id]['validator'](value, validatorArgs)
                return validator ? null: {
                    id,
                    message: this.validators[id]['errorMessage'](value, validatorArgs)
                }
            })
            .filter(i => !!i)
    }

    validateClassInstance(value: any, classFn: Function): Object[] {
        return Object.getOwnPropertyNames(value)
            .map(prop => ({
                prop,
                errors: this.validate(
                    value[prop],
                    this.classAnnotationsStore.getPropertyAnnotations(classFn, prop, ValidatorAnnotation).map(i => i.data) as ValidatorData[]
                )
            }))
            .filter(result => result.errors.length > 0)
    }
}
