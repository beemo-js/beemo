export function registerValidators(validator) {
    // Global
    validator.registerValidator('typed', (value, { type }) => value.constructor === type, (value, { type }) => `Value should be of type ${type.name} (value given: ${value.constructor.name})`);
    validator.registerValidator('not_null', (value) => value != null, (value) => `Value should not be null (value given: ${value})`);
    // Numbers
    validator.registerValidator('min', (value, { lowerBound }) => value >= lowerBound, (value, { lowerBound }) => `Value should be higher than or equal to ${lowerBound} (value given: ${value})`);
    validator.registerValidator('max', (value, { upperBound }) => value <= upperBound, (value, { upperBound }) => `Value should be lower than or equal to ${upperBound} (value given: ${value})`);
    validator.registerValidator('between', (value, { lowerBound, upperBound }) => value >= lowerBound && value <= upperBound, (value, { lowerBound, upperBound }) => `Value should be between ${lowerBound} and ${upperBound} (value given: ${value})`);
    validator.registerValidator('positive', (value) => value > 0, (value) => `Value should be positive (value given: ${value})`);
    validator.registerValidator('positive_or_zero', (value) => value >= 0, (value) => `Value should be positive (value given: ${value})`);
    validator.registerValidator('negative', (value) => value < 0, (value) => `Value should be negative (value given: ${value})`);
    validator.registerValidator('negative_or_zero', (value) => value <= 0, (value) => `Value should be negative (value given: ${value})`);
    // Strings
    validator.registerValidator('pattern', (value, { pattern }) => pattern.test(value), (value, { pattern }) => `Value should match pattern ${value.toString()} (value given: ${value})`);
    validator.registerValidator('email', (value) => /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value), (value) => `Value should be a valid email (value given: ${value})`);
    validator.registerValidator('url', (value) => /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(value), (value) => `Value should be a valid URL (value given: ${value})`);
    // Arrays
    validator.registerValidator('not_empty', (value) => value.length > 0, (value) => `Value should not be empty (value given: ${value})`);
    validator.registerValidator('length', (value, { length }) => value.length === length, (value, { length }) => `Value should have a length of ${length} (value given: ${value})`);
    validator.registerValidator('min_length', (value, { length }) => value.length >= length, (value, { length }) => `Value should have a minimum length of ${length} (value given: ${value})`);
    validator.registerValidator('max_length', (value, { length }) => value.length <= length, (value, { length }) => `Value should have a maximum length of ${length} (value given: ${value})`);
    validator.registerValidator('length_between', (value, { minLength, maxLength }) => value.length >= minLength && value.length <= maxLength, (value, { minLength, maxLength }) => `Value should have a length between ${minLength} and ${maxLength} (value given: ${value})`);
    // Dates
    validator.registerValidator('past', (value, { from }) => value < (from || new Date()), (value, { from }) => `Value should be in the past from ${from} (value given: ${value})`);
    validator.registerValidator('future', (value, { from }) => value > (from || new Date()), (value, { from }) => `Value should be in the future from ${from} (value given: ${value})`);
    // Classes
    validator.registerValidator('valid', (value, { classFn }) => validator.validateClassInstance(value, classFn).length === 0, (value, { classFn }) => `Value does not pass validation of class ${classFn}`);
}
