import { ValidatorType, ValidatorData, ValidatorError } from './types';
import { ClassAnnotationsStore } from '../annotations/ClassAnnotationsStore';
export declare class Validator {
    private classAnnotationsStore;
    /**
     * Maps validator ids to validators.
     */
    private validators;
    constructor(classAnnotationsStore: ClassAnnotationsStore);
    /**
     * Register a validator. The Validator will then know how to validate a value using given validator id.
     */
    registerValidator(validatorId: string, validator: ValidatorType, errorMessage: (value, Object) => string): void;
    /**
     * Validate a value using given validators.
     */
    validate(value: any, validatorsData: ValidatorData[]): ValidatorError[];
    /**
     * Validate a class instance.
     */
    validateClassInstance(value: any, classFn: Function): Object[];
}
