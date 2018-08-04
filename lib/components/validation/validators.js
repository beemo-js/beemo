"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function registerValidators(validator) {
    // Global
    validator.registerValidator('typed', function (value, _a) {
        var type = _a.type;
        return value.constructor === type;
    }, function (value, _a) {
        var type = _a.type;
        return "Value should be of type " + type.name + " (value given: " + value.constructor.name + ")";
    });
    validator.registerValidator('not_null', function (value) { return value != null; }, function (value) { return "Value should not be null (value given: " + value + ")"; });
    // Numbers
    validator.registerValidator('min', function (value, _a) {
        var lowerBound = _a.lowerBound;
        return value >= lowerBound;
    }, function (value, _a) {
        var lowerBound = _a.lowerBound;
        return "Value should be higher than or equal to " + lowerBound + " (value given: " + value + ")";
    });
    validator.registerValidator('max', function (value, _a) {
        var upperBound = _a.upperBound;
        return value <= upperBound;
    }, function (value, _a) {
        var upperBound = _a.upperBound;
        return "Value should be lower than or equal to " + upperBound + " (value given: " + value + ")";
    });
    validator.registerValidator('between', function (value, _a) {
        var lowerBound = _a.lowerBound, upperBound = _a.upperBound;
        return value >= lowerBound && value <= upperBound;
    }, function (value, _a) {
        var lowerBound = _a.lowerBound, upperBound = _a.upperBound;
        return "Value should be between " + lowerBound + " and " + upperBound + " (value given: " + value + ")";
    });
    validator.registerValidator('positive', function (value) { return value > 0; }, function (value) { return "Value should be positive (value given: " + value + ")"; });
    validator.registerValidator('positive_or_zero', function (value) { return value >= 0; }, function (value) { return "Value should be positive (value given: " + value + ")"; });
    validator.registerValidator('negative', function (value) { return value < 0; }, function (value) { return "Value should be negative (value given: " + value + ")"; });
    validator.registerValidator('negative_or_zero', function (value) { return value <= 0; }, function (value) { return "Value should be negative (value given: " + value + ")"; });
    // Strings
    validator.registerValidator('pattern', function (value, _a) {
        var pattern = _a.pattern;
        return pattern.test(value);
    }, function (value, _a) {
        var pattern = _a.pattern;
        return "Value should match pattern " + value.toString() + " (value given: " + value + ")";
    });
    validator.registerValidator('email', function (value) { return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value); }, function (value) { return "Value should be a valid email (value given: " + value + ")"; });
    validator.registerValidator('url', function (value) { return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(value); }, function (value) { return "Value should be a valid URL (value given: " + value + ")"; });
    // Arrays
    validator.registerValidator('not_empty', function (value) { return value.length > 0; }, function (value) { return "Value should not be empty (value given: " + value + ")"; });
    validator.registerValidator('length', function (value, _a) {
        var length = _a.length;
        return value.length === length;
    }, function (value, _a) {
        var length = _a.length;
        return "Value should have a length of " + length + " (value given: " + value + ")";
    });
    validator.registerValidator('min_length', function (value, _a) {
        var length = _a.length;
        return value.length >= length;
    }, function (value, _a) {
        var length = _a.length;
        return "Value should have a minimum length of " + length + " (value given: " + value + ")";
    });
    validator.registerValidator('max_length', function (value, _a) {
        var length = _a.length;
        return value.length <= length;
    }, function (value, _a) {
        var length = _a.length;
        return "Value should have a maximum length of " + length + " (value given: " + value + ")";
    });
    validator.registerValidator('length_between', function (value, _a) {
        var minLength = _a.minLength, maxLength = _a.maxLength;
        return value.length >= minLength && value.length <= maxLength;
    }, function (value, _a) {
        var minLength = _a.minLength, maxLength = _a.maxLength;
        return "Value should have a length between " + minLength + " and " + maxLength + " (value given: " + value + ")";
    });
    // Dates
    validator.registerValidator('past', function (value, _a) {
        var from = _a.from;
        return value < (from || new Date());
    }, function (value, _a) {
        var from = _a.from;
        return "Value should be in the past from " + from + " (value given: " + value + ")";
    });
    validator.registerValidator('future', function (value, _a) {
        var from = _a.from;
        return value > (from || new Date());
    }, function (value, _a) {
        var from = _a.from;
        return "Value should be in the future from " + from + " (value given: " + value + ")";
    });
    // Classes
    validator.registerValidator('valid', function (value, _a) {
        var classFn = _a.classFn;
        return validator.validateClassInstance(value, classFn).length === 0;
    }, function (value, _a) {
        var classFn = _a.classFn;
        return "Value does not pass validation of class " + classFn;
    });
}
exports.registerValidators = registerValidators;
