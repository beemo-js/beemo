const build = (id, args = {}) => ({ id, args });
// Global
export const defaultTo = (value) => build('default_to', { value });
// Numbers
export const round = () => build('round');
export const floor = () => build('floor');
export const ceil = () => build('ceil');
// Strings
export const lowerCase = () => build('lower_case');
export const upperCase = () => build('upper_case');
export const trim = () => build('trim');
export const replace = (pattern, replacement) => build('replace', { pattern, replacement });
export const encodeUrl = () => build('encode_url');
export const encodeUrlComponent = () => build('encode_url_component');
export const decodeUrl = () => build('decode_url');
export const decodeUrlComponent = () => build('decode_url_component');
// Arrays
export const sort = (reverse = false) => build('sort', { reverse });
export const reverse = () => build('reverse');
