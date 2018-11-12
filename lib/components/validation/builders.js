const build = (id, args = {}) => ({ id, args });
// Global
export const typed = (type) => build('typed', { type });
export const notNull = () => build('not_null');
// Numbers
export const min = (lowerBound) => build('min', { lowerBound });
export const max = (upperBound) => build('max', { upperBound });
export const between = (lowerBound, upperBound) => build('between', { lowerBound, upperBound });
export const positive = () => build('positive');
export const positiveOrZero = () => build('positive_or_zero');
export const negative = () => build('negative');
export const negativeOrZero = () => build('negative_or_zero');
// Strings
export const pattern = (pattern) => build('pattern', { pattern: new RegExp(pattern) });
export const email = () => build('email');
export const url = () => build('url');
// Arrays
export const notEmpty = () => build('not_empty');
export const length = (length) => build('length', { length });
export const minLength = (length) => build('min_length', { length });
export const maxLength = (length) => build('max_length', { length });
export const lengthBetween = (minLength, maxLength) => build('length_between', { minLength, maxLength });
// Dates
export const past = (from) => build('past', { from });
export const future = (from) => build('future', { from });
// Classes
export const valid = (classFn) => build('valid', { classFn });
