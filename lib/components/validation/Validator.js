import { Constraints as ValidatorAnnotation } from './annotations/constraints';
export class Validator {
    constructor(classAnnotationsStore) {
        this.classAnnotationsStore = classAnnotationsStore;
        /**
         * Maps validator ids to validators.
         */
        this.validators = {};
    }
    /**
     * Register a validator. The Validator will then know how to validate a value using given validator id.
     */
    registerValidator(validatorId, validator, errorMessage) {
        this.validators[validatorId] = {
            validator,
            errorMessage
        };
    }
    /**
     * Validate a value using given validators.
     */
    validate(value, validatorsData) {
        return validatorsData
            .map(validatorData => {
            const id = validatorData.id;
            const validatorArgs = validatorData.args;
            const validator = this.validators[id]['validator'](value, validatorArgs);
            return validator ? null : {
                id,
                message: this.validators[id]['errorMessage'](value, validatorArgs)
            };
        })
            .filter(i => !!i);
    }
    /**
     * Validate a class instance.
     */
    validateClassInstance(value, classFn) {
        return Object.getOwnPropertyNames(value)
            .map(prop => ({
            prop,
            errors: this.validate(value[prop], this.classAnnotationsStore.getPropertyAnnotations(classFn, prop, ValidatorAnnotation).map(i => i.data))
        }))
            .filter(result => result.errors.length > 0);
    }
}
