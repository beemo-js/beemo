import {ValidatorType, ValidatorData, ValidatorError} from './types'
import {ClassAnnotationsStore} from '../annotations/ClassAnnotationsStore'
import {Constraints as ValidatorAnnotation} from './annotations/constraints'

export class Validator {
    /**
     * Maps validator ids to validators.
     */
    private validators: {[validatorId: string]: {validator: ValidatorType, errorMessage: (value, Object) => string}} = {}

    constructor(
        private classAnnotationsStore: ClassAnnotationsStore
    ) {}

    /**
     * Register a validator. The Validator will then know how to validate a value using given validator id.
     */
    registerValidator(validatorId: string, validator: ValidatorType, errorMessage: (value, Object) => string): void {
        this.validators[validatorId] = {
            validator,
            errorMessage
        }
    }

    /**
     * Validate a value using given validators.
     */
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

    /**
     * Validate a class instance.
     */
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
