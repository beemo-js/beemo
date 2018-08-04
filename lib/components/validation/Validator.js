"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constraints_1 = require("./annotations/constraints");
var Validator = /** @class */ (function () {
    function Validator(classAnnotationsStore) {
        this.classAnnotationsStore = classAnnotationsStore;
        /**
         * Maps validator ids to validators.
         */
        this.validators = {};
    }
    /**
     * Register a validator. The Validator will then know how to validate a value using given validator id.
     */
    Validator.prototype.registerValidator = function (validatorId, validator, errorMessage) {
        this.validators[validatorId] = {
            validator: validator,
            errorMessage: errorMessage
        };
    };
    /**
     * Validate a value using given validators.
     */
    Validator.prototype.validate = function (value, validatorsData) {
        var _this = this;
        return validatorsData
            .map(function (validatorData) {
            var id = validatorData.id;
            var validatorArgs = validatorData.args;
            var validator = _this.validators[id]['validator'](value, validatorArgs);
            return validator ? null : {
                id: id,
                message: _this.validators[id]['errorMessage'](value, validatorArgs)
            };
        })
            .filter(function (i) { return !!i; });
    };
    /**
     * Validate a class instance.
     */
    Validator.prototype.validateClassInstance = function (value, classFn) {
        var _this = this;
        return Object.getOwnPropertyNames(value)
            .map(function (prop) { return ({
            prop: prop,
            errors: _this.validate(value[prop], _this.classAnnotationsStore.getPropertyAnnotations(classFn, prop, constraints_1.Constraints).map(function (i) { return i.data; }))
        }); })
            .filter(function (result) { return result.errors.length > 0; });
    };
    return Validator;
}());
exports.Validator = Validator;
